import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const auth = express.Router();
import authController from "../../controllers/auth";

auth.get("/", authController.getAllUsers);

auth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

auth.get("/google/redirect", (req: Request, res: Response) =>
  res.send("You reached the callback URI")
);

export = auth;
