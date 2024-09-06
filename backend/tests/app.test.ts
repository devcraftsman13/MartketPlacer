import request from "supertest";
import app from "../src/index";

describe("GET /products", () => {
  it("should return a list of products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
