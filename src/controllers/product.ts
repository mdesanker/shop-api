import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import Product, { IProduct } from "../models/Product";

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

const addProduct = [
  // Validate and sanitize input
  check("name", "Name is required").trim().notEmpty(),
  check("price", "Price is required").trim().isNumeric().notEmpty(),
  check("description", "Description is required").trim().notEmpty(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    // Handle validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create new product
      const { name, price, description } = req.body;

      const product = new Product<IProduct>({
        name,
        price,
        description,
      });

      await product.save();

      return res.json(product);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).send("Server error");
      }
    }
  },
];

export default { getAllProducts, getProduct, addProduct };
