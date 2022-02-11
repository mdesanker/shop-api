import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
import brcrypt from "bcryptjs";

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

export default { register };
