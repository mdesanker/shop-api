import express, { Request, Response, NextFunction } from "express";
const product = express.Router();
import productController from "../../controllers/product";

product.get("/all", productController.getAllProducts);
product.get("/:id", productController.getProduct);
product.get("/category/:id", productController.getCategoryProducts);
product.post("/create", productController.addProduct);
product.put("/:id", productController.updateProduct);

export = product;
