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

export default { getAllCategories };
