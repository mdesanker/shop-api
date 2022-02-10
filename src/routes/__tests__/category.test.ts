import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";
import seedDB from "./seed";

// Global variables
const categoryId = "62054d165b6ab15439227791";
const invalidCategoryId = "62054d165b6ab15439200000";

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
describe("GET /category", () => {
  it("category test route", async () => {
    const res = await request(app).get("/category");

    expect(res.statusCode).toEqual(200);
  });
});
