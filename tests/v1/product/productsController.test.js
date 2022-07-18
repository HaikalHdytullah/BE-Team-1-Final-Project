const request = require("supertest");
const app = require("../../../app");
const argsLogin = { email: "user@gmail.com", password: "123" }; // Login
let token200 = "";
let productId = "";

beforeAll(async () => {
  return await request(app)
    .post("/api/v1/login")
    .send(argsLogin)
    .then((res) => {
      token200 = res.body.token;
    });
});

afterAll(async () => {
  return await request(app)
    .delete("/api/v1/product")
    .set("Authorization", `Bearer ${token200}`)
    .query({ id: productId });
});

describe("API Product", () => {
  it("Get All Product -> response code 200", async () => {
    return await request(app)
      .get("/api/v1/products")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product By Id -> response code 200", async () => {
    return await request(app)
      .get("/api/v1/product")
      .query({ id: 1 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product By Id -> response code 404", async () => {
    return await request(app)
      .get("/api/v1/product")
      .query({ id: 9999 })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product by Id Seller -> response code 200", async () => {
    return await request(app)
      .get("/api/v1/product/seller")
      .query({ idUser: 2 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("getProductByKategory -> response code 500", async () => {
    return await request(app)
      .get("/api/v1/product/kategory")
      .query({ kategori: "Elektronik" })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("getProductsByMinatAndSellerAndTerjual -> response code 200", async () => {
    return await request(app)
      .get("/api/v1/product/minat")
      .query({ idUser: 2, minat: true, terjual: true })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("getProductByName -> response code 500", async () => {
    return await request(app)
      .get("/api/v1/product/name")
      .query({ nama: "Obat" })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("addProduct -> response code 200", async () => {
    return await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token200}`)
      .attach("gambar", "")
      .field({
        idUser: 2,
        nama: "Obat",
        kategori: "Elektronik",
        harga: 10000,
        deskripsi: "Obat yang berkualitas",
        minat: false,
        terjual: false,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        productId = res.body.id;
      });
  });

  it("addProduct -> response code 400", async () => {
    return await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token200}`)
      .attach("gambar", "")
      .send({
        idUser: 2,
        nama: "Obat",
        kategori: "Elektronik",
        harga: 10000,
        deskripsi: "Obat yang berkualitas",
        minat: false,
        terjual: false,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        productId = res.body.id;
      });
  });

  it("updateProduct -> response code 200", async () => {
    return await request(app)
      .put("/api/v1/products/1")
      .set("Authorization", `Bearer ${token200}`)
      .attach("gambar", "")
      .field({
        id: 1,
        idUser: 1,
        nama: "Obat",
        kategori: "Elektronik",
        harga: 10000,
        deskripsi: "Obat yang berkualitas",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("updateProduct -> response code 400", async () => {
    return await request(app)
      .put("/api/v1/products/1")
      .set("Authorization", `Bearer ${token200}`)
      .attach("gambars", "")
      .send({
        idUser: 1,
        nama: "Obat",
        kategori: "Elektronik",
        harga: 10000,
        deskripsi: "Obat yang berkualitas",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("deleteProduct -> response code 200", async () => {
    return await request(app)
      .delete("/api/v1/products/10")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });
});
