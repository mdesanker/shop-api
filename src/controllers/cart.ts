import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";

const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Cart GET controller test");
};

export default { getAllCarts };
