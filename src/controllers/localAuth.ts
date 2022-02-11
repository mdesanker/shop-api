import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const register = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Local authentication");
};

export default { register };
