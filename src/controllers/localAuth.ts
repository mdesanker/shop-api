import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
import brcrypt from "bcryptjs";
import passport from "passport";

const register = [
  // Validate and sanitize input
  check("firstName", "First name is required").trim().notEmpty(),
  check("lastName", "Last name is required").trim().notEmpty(),
  check("email", "Email is required").trim().notEmpty(),
  check("password", "Password is required").trim().notEmpty(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      const user = new User<IUser>({
        name: {
          firstName,
          lastName,
        },
        email,
        password,
      });

      user.password = await brcrypt.hash(password, 10);

      const newUser = await user.save();

      res.json(newUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).send("Server error");
      }
    }
  },
];

const login = [
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Log in controller running...");
    next();
  },
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    console.log("USER IN REQUEST BODY", req.user);
    res.json(req.user);
  },
];

export default { register, login };
