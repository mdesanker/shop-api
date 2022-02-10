import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

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

export default { getAllCategories, getCategory };
