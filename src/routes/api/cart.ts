import express, { Request, Response, NextFunction } from "express";
const cart = express.Router();

cart.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("Cart GET test")
);

export = cart;
