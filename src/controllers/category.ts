import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import { check, validationResult } from "express-validator";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({});

    res.json(categories);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    // Invalid id
    if (!category) {
      return res.status(400).json({ errors: [{ msg: "Invalid category id" }] });
    }

    res.json(category);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const addCategory = [
  // Validate and sanitize input
  check("name", "Name is required").trim().notEmpty(),
  check("description").trim(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;

      // Check name not used
      const existingCategory = await Category.findOne({ name });

      if (existingCategory) {
        return res.status(400).json({
          errors: [{ msg: "A category with this name already exists" }],
        });
      }

      // Create new category
      const category = new Category({
        name,
        description,
      });

      const newDocument = await category.save();
      console.log(newDocument);
      res.json(newDocument);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).send("Server error");
      }
    }
  },
];

export default { getAllCategories, getCategory, addCategory };
