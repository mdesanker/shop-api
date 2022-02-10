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

// GET ROUTES
describe("GET /category/all", () => {
  it("return array of all categories", async () => {
    const res = await request(app).get("/category/all");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /category/:id", () => {
  it("return specific category", async () => {
    const res = await request(app).get(`/category/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
  });

  it("return error for invalid category id", async () => {
    const res = await request(app).get(`/category/${invalidCategoryId}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Invalid category id");
  });
});
