import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const auth = express.Router();
import authController from "../../controllers/auth";

auth.get("/", (req: Request, res: Response) => {
  res.json({ msg: "You are not logged in" });
});

auth.get("/failed", (req: Request, res: Response) => {
  res.json({ msg: "Failed" });
});

auth.get("/success", (req: Request, res: Response) => {
  console.log(req);
  res.send(`Welcome ${req.user && req.user._json.email}`);
});

auth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

auth.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    // successRedirect: "/auth/success",
  }),
  (req: Request, res: Response) => {
    res.redirect("/auth/success");
    // res.send("You are logged in")
  }
);

export = auth;
