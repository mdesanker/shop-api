import { Request, Response, NextFunction } from "express";
import passport from "passport";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Auth GET controller test");
};

// Sign in fails
const signinFailed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ msg: "Authentication failed" });
};

// Sign in successful
const signinSuccessful = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  res.json({ msg: "Authentication successful" });
};

// Google authenticate
const googleAuthenticate = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google redirect
const googleRedirect = [
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    // session: false,
    // successRedirect: "/auth/success",
  }),
  async (req: Request, res: Response) => {
    // console.log(req.user);
    // const token = req.user.generateJWT();
    res.redirect("/auth/success");
  },
];

// Logout
const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.redirect("/");
};

const testRoute = async (req: Request, res: Response) => {
  console.log("TEST ROUTE USER", req.user);
  res.json({ msg: "Test route" });
};

export default {
  getAllUsers,
  signinFailed,
  signinSuccessful,
  googleAuthenticate,
  googleRedirect,
  logout,
  testRoute,
};
