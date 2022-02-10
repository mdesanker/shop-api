import express, { Request, Response, NextFunction } from "express";
const category = express.Router();
import categoryController from "../../controllers/category";

category.get("/all", categoryController.getAllCategories);
category.get("/:id", categoryController.getCategory);
category.post("/create", categoryController.addCategory);
category.put("/:id/update", categoryController.updateCategory);
category.delete("/:id/delete", categoryController.deleteCategory);

export = category;
