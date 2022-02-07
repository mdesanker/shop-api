import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).populate("category");

    return res.json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    // Invalid product id
    if (!product) {
      return res.status(400).json({ errors: [{ msg: "Invalid product id" }] });
    }

    return res.json(product);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
};

export default { getAllProducts, getProduct };
