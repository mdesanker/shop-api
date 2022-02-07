import express, { Request, Response, NextFunction } from "express";
const category = express.Router();

category.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("Category GET test")
);

export = category;
