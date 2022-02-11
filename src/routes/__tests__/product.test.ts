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

// PRODUCT GET ROUTES
describe("GET /product/all", () => {
  it("return array of all products", async () => {
    const res = await request(app).get("/product/all");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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

describe("GET /product/category/:id", () => {
  it("return all products for specific category", async () => {
    const res = await request(app).get(`/product/category/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("return error for invalid category id", async () => {
    const res = await request(app).get(
      `/product/category/${invalidCategoryId}`
    );

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Invalid category id");
  });
});

// PRODUCT POST ROUTES
describe("POST /product/create", () => {
  it("return created product", async () => {
    const res = await request(app).post("/product/create").send({
      name: "New product",
      price: 38,
      description: "Description for the new product",
      images: [],
      category: categoryId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toEqual("New product");
    expect(res.body).toHaveProperty("price");
    expect(typeof res.body.price).toBe("number");
    expect(res.body).toHaveProperty("description");
  });

  it("return error for missing required field", async () => {
    const res = await request(app).post("/product/create").send({
      name: "",
      price: 13,
      description: "My name is missing",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Name is required");
  });
});

// PRODUCT PUT ROUTES
describe("PUT /product/:id", () => {
  it("return updated product", async () => {
    const res = await request(app).put(`/product/${productId}`).send({
      name: "Updated product name",
      price: 22,
      description: "Updated product description",
      images: [],
      category: categoryId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toEqual("Updated product name");
    expect(res.body.price).toEqual(22);
    expect(res.body.images.length).toEqual(0);
    expect(res.body.category).not.toEqual(null);
  });

  it("return error if name missing", async () => {
    const res = await request(app).put(`/product/${productId}`).send({
      name: "",
      price: 22,
      description: "Product name is missing",
      images: [],
      category: categoryId,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Name is required");
  });

  it("return error for invalid product id", async () => {
    const res = await request(app).put(`/product/${invalidProductId}`).send({
      name: "Wrong id",
      price: 22,
      description: "oops",
      images: [],
      category: null,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toEqual("Invalid product id");
  });
});
