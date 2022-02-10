import express, { Request, Response, NextFunction } from "express";
const category = express.Router();
import categoryController from "../../controllers/category";

category.get("/all", categoryController.getAllCategories);

export = category;
