const request = require("supertest");
const app = require("../../../app");
const argsLogin = {email: "user@gmail.com", password: "123"}; // Login
let token200 = "";
let transactionId = "";

beforeAll(async () => {
    // Ambil Token
    return await request(app)
        .post("/api/v1/login")
        .send(argsLogin)
        .then((res) => {
            token200 = res.body.token;
        });
});

describe("API Transaction", () => {
    it("Get All Transaksi Pembelian (Buyer) -> response code 200", async () => {
        return await request(app)
            .get("/api/v1/trBuyer")
            .set("Authorization", `Bearer ${token200}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(expect.any(Object));
            });
    });

    it("Get All Transaksi Penjualan (Seller) -> response code 200", async () => {
        return await request(app)
            .get("/api/v1/trSeller")
            .set("Authorization", `Bearer ${token200}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(expect.any(Object));
            });
    });

    it("Create Transaksi Pembelian (Buyer) -> response code 201", async () => {
        return await request(app)
            .post("/api/v1/transaction")
            .set("Authorization", `Bearer ${token200}`)
            .query({
                idProduct: 1,
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(expect.any(Object));
                transactionId = res.body.transaction.id;
            });
    });

    it("Update Transaksi (Seller) - response code 200", async () => {
        return await request(app)
            .put("/api/v1/transaction")
            .set("Authorization", `Bearer ${token200}`)
            .query({
                id: transactionId,
                status: "Diproses",
            })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(expect.any(Object));
            });
    });

    it("Update Status Transaksi End (Seller) - response code 200", async () => {
        return await request(app)
            .put("/api/v1/transaction/status")
            .set("Authorization", `Bearer ${token200}`)
            .query({
                id: transactionId,
                idProduk: 1,
                status: "Selesai",
                terjual: "true",
            })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(expect.any(Object));
            });
    });

    it("Update Status Transaksi End (Seller) - response code 500", async () => {
        return await request(app)
            .put("/api/v1/transaction/status")
            .set("Authorization", `Bearer ${token200}`)
            .query({
                status: "Selesai",
            })
            .then((res) => {
                expect(res.statusCode).toBe(500);
                expect(res.body).toEqual(expect.any(Object));
            });
    });
});
