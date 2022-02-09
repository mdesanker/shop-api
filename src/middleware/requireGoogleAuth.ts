import { Request, Response, NextFunction } from "express";

const requireGoogleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ msg: "User is not authenticated" });
  }
};

export default requireGoogleAuth;
