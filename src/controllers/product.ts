import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import Category from "../models/Category";

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
    const product = await Product.findById(id).populate("category");

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

const getCategoryProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Check id is valid
    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({ errors: [{ msg: "Invalid category id" }] });
    }

    // Get products
    const products = await Product.find({ category: id }).populate("category");

    res.json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send("Server error");
    }
  }
};

const addProduct = [
  // Convert images to array
  async (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.images instanceof Array)) {
      if (typeof req.body.images === "undefined") req.body.images = [];
      else req.body.images = new Array(req.body.images);
    }
    next();
  },

  // Validate and sanitize input
  check("name", "Name is required").trim().notEmpty(),
  check("price", "Price is required").trim().isNumeric(),
  check("description", "Description is required").trim().notEmpty(),
  check("images.*").trim(),
  check("category").trim(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    // Handle validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create new product
      const { name, price, description, images, category } = req.body;

      const product = new Product<IProduct>({
        name,
        price,
        description,
        images,
        category: category ? category : null,
      });

      const newProduct = await product.save();

      // Populate category
      await Product.populate(newProduct, { path: "category" });

      return res.json(newProduct);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).send("Server error");
      }
    }
  },
];

const updateProduct = [
  // Convert images to array
  async (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.images instanceof Array)) {
      if (typeof req.body.images === "undefined") req.body.images = [];
      else req.body.images = new Array(req.body.images);
    }
    next();
  },

  // Validate and sanitize input
  check("name", "Name is required").trim().notEmpty(),
  check("price", "Price is required").trim().isNumeric(),
  check("description", "Description is required").trim().notEmpty(),
  check("images.*").trim(),
  check("category").trim(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, price, description, images, category } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check id is valid
      const product = await Product.findById(id);

      if (!product) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid product id" }] });
      }

      // Create new product
      const updatedProduct = new Product<IProduct>({
        _id: id,
        name,
        price,
        description,
        images,
        category: category ? category : null,
      });

      const updatedDocument = await Product.findByIdAndUpdate(
        id,
        updatedProduct,
        { new: true }
      ).populate("category");

      res.json(updatedDocument);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).send("Server error");
      }
    }
  },
];

export default {
  getAllProducts,
  getProduct,
  getCategoryProducts,
  addProduct,
  updateProduct,
};
