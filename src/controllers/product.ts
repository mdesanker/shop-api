import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Product GET controller test");
};

export default { getAllProducts };
