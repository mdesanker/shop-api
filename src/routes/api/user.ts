import express, { Request, Response, NextFunction } from "express";
const user = express.Router();

user.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("User GET test")
);

export = user;
