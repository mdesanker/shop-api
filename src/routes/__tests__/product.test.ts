import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";
import seedDB from "./seed";

// Global variables

// Pre-test
beforeAll(async () => {
  await initializeMongoServer();
  await seedDB();
});

// Post-test
afterAll(async () => {
  mongoose.connection.close();
});

// Test test
describe("GET /product", () => {
  it("product test route", async () => {
    const res = await request(app).get("/product");

    expect(res.statusCode).toEqual(200);
  });
});
