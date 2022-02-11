import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log("Authenticating with local strategy...");
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password!);
        console.log("Password match", isMatch);

        if (!isMatch) {
          return done(null, false);
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

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
