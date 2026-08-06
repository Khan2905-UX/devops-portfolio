const request = require("supertest");
const app = require("../src/app");

describe("DevOps Portfolio API", () => {
  test("GET / returns status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "DevOps Portfolio API is running." });
  });

  test("GET /api/health returns status ok", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status: "ok" }));
  });

  test("GET /not-found returns 404", async () => {
    const response = await request(app).get("/not-found");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not Found" });
  });
});
