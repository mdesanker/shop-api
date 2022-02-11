import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return done(null, false, { message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password!);

        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, existingUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  )
);
