import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).populate("category");

    res.json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
};

export default { getAllProducts };
