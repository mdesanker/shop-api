import express, { Request, Response, NextFunction } from "express";
const auth = express.Router();

auth.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("Auth GET test")
);

export = auth;
