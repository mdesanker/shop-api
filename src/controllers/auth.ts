import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Auth GET controller test");
};

export default { getAllUsers };
