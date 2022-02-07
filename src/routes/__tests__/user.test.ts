import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";

// Global variables

// Pre-test
beforeAll(async () => {
  await initializeMongoServer();
});

// Post-test
afterAll(async () => {
  mongoose.connection.close();
});

// Test test
describe("GET /user", () => {
  it("user test route", async () => {
    const res = await request(app).get("/user");

    expect(res.statusCode).toEqual(200);
  });
});
