import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Category GET controller test");
};

export default { getAllCategories };
