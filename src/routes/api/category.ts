import express from "express";
const category = express.Router();
import categoryController from "../../controllers/category";

category.get("/all", categoryController.getAllCategories);
category.get("/:id", categoryController.getCategory);
category.post("/create", categoryController.addCategory);
category.put("/:id", categoryController.updateCategory);
category.delete("/:id", categoryController.deleteCategory);

export = category;
