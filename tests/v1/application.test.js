const request = require("supertest");
const app = require("../../app");

describe("Application Test", () => {
    it("404 Not Found", async () => {
        await request(app)
            .get("/invalid")
            .then((res) => {
                expect(res.statusCode).toBe(404);
            });
    });
});
