import app from "./index";
import request from "supertest";
import mongoose from "mongoose";
import initializeMongoServer from "../../config/mongoConfigTesting";
import seedDB from "./seed";

// GLOBAL VARIABLES
const productId = "62017133d314aff5da2f2d6c";
const invalidProductId = "62017133d314aff5da200000";
const categoryId = "62054d165b6ab15439227791";
const invalidCategoryId = "62054d165b6ab15439200000";

// PRE-TEST
beforeAll(async () => {
  await initializeMongoServer();
  await seedDB();
});

// POST-TEST
afterAll(async () => {
  mongoose.connection.close();
});

// LOCAL AUTH POST ROUTES
describe("POST /local/register", () => {
  it("return registered user", async () => {
    const res = await request(app).post("/local/register").send({
      username: "mdank",
      password: "password",
    });

    expect(res.statusCode).toEqual(200);
  });
});
