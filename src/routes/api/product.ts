import express, { Request, Response, NextFunction } from "express";
const product = express.Router();

product.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("Product GET test")
);

export = product;
