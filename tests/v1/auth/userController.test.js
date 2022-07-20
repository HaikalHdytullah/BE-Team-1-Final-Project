const request = require("supertest");
const app = require("../../../app");

const args400 = {
  emails: "invalid400@gmail.com",
  passwords: "123",
  names: "Invalid",
}; // Salah nama field
const argsLogin = { email: "user@gmail.com", password: "123" }; // Login
const argsRegister = {
  email: "user_regis@gmail.com",
  password: "123",
  name: "Invalid",
}; // Register
const login401 = { email: "user@gmail.com", password: "wrong" }; // Wrong Password
const login404 = { email: "invalid404@gmail.com", password: "123" }; // Invalid Email
const user = {
  idUser: 2,
  nama: "Invalid",
  kota: "SYSTEM",
  alamat: "SYSTEM",
  noHp: "+628123456789",
}; // Data User Update
const token401 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtYSI6InVzZXIiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwia290YSI6bnVsbCwiYWxhbWF0IjpudWxsLCJub0hwIjpudWxsLCJnYW1iYXIiOm51bGwsImdvb2dsZUlkIjpudWxsLCJyZWdpc3RlcmVkVmlhIjoibG9jYWwiLCJpZFR5cGUiOjIsImNyZWF0ZWRBdCI6IjIwMjItMDctMTRUMTE6Mjk6MzUuMDU1WiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMTRUMTE6Mjk6MzUuMDU1WiIsImlhdCI6MTY1Nzg1NTU0NCwiZXhwIjoxNjU3ODU5MTQ0fQ.5isuNT8jdn6B97xyeOazGsDtMGfYL09wDSeUTT0sb7o"; // Expired Token
let token200 = ""; // Token Login

beforeAll(async () => {
  // Get Token
  return await request(app)
    .post("/api/v1/login")
    .send(argsLogin)
    .then((res) => {
      token200 = res.body.token;
    });
});

afterAll(async () => {
  return await request(app)
    .delete(`/api/v1/auth/delete/${argsRegister.email}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: "Akun berhasil dihapus",
        status: "OK",
      });
    });
});

describe("User Controller", () => {
  it("REGISTER - Jika Register berhasil -> response code 201", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(argsRegister)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          user: expect.any(Object),
        });
      });
  });

  it("REGISTER - Jika Email sudah terdaftar -> response code 400", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(argsLogin)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          message: "Email already exists",
        });
      });
  });

  it("REGISTER - Jika nama field salah -> response code 400", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(args400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });

  it("LOGIN - Jika Login berhasil -> response code 200", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(argsLogin)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          token: expect.any(String),
        });
      });
  });

  it("LOGIN - Jika Email belum terdaftar -> response code 404", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(login404)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          message: "Email tidak ditemukan",
        });
      });
  });

  it("LOGIN - Jika Password salah -> response code 401", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(login401)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          message: "Password tidak sesuai",
        });
      });
  });

  it("LOGIN - Jika nama field salah -> response code 400", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(args400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });

  it("WHOAMI - Jika Token valid -> response code 200", async () => {
    return await request(app)
      .get("/api/v1/whoami")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.body).toEqual({
          user: expect.any(Object),
        });
      });
  });

  it("WHOAMI - Jika Token Expired -> response code 401", async () => {
    return await request(app)
      .get("/api/v1/whoami")
      .set("Authorization", `Bearer ${token401}`)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          message: "Token Expired",
        });
      });
  });

  it("WHOAMI -> response code 400", async () => {
    return await request(app)
      .get("/api/v1/whoami")
      .set("Authorization", `Bearer invalid`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("UPDATE INFO USER - Berhasil -> response code 200", async () => {
    return await request(app)
      .put("/api/v1/profile")
      .set("Authorization", `Bearer ${token200}`)
      .attach("gambar", "")
      .field(user)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: "OK",
          message: "Profile berhasil diperbarui",
          data: expect.any(Object),
        });
      });
  });
});
