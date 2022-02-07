import express, { Request, Response, NextFunction } from "express";
const product = express.Router();
import productController from "../../controllers/product";

product.get("/all", productController.getAllProducts);

export = product;
