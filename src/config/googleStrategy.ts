import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);

      try {
        // Check if user exists
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User<IUser>({
          googleId: profile.id,
          name: {
            firstName: profile.name?.givenName!,
            lastName: profile.name?.familyName!,
          },
          email: profile._json.email!,
          avatar: profile._json.picture!,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
