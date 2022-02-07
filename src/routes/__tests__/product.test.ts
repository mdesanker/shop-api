import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";
import seedDB from "./seed";

// GLOBAL VARIABLES

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
