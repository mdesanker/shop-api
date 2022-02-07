import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";
import seedDB from "./seed";

// GLOBAL VARIABLES
const productId = "62017133d314aff5da2f2d6c";
const invalidProductId = "62017133d314aff5da200000";

// PRE-TEST
beforeAll(async () => {
  await initializeMongoServer();
  await seedDB();
});

// POST-TEST
afterAll(async () => {
  mongoose.connection.close();
});

// PRODUCT GET ROUTES
describe("GET /product/all", () => {
  it("return array of all products", async () => {
    const res = await request(app).get("/product/all");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /product/:id", () => {
  it("return single product", async () => {
    const res = await request(app).get(`/product/${productId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("description");
  });

  it("return error for invalid id", async () => {
    const res = await request(app).get(`/product/${invalidProductId}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Invalid product id");
  });
});
