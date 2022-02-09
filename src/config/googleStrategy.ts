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
      console.log(profile);

      try {
        // Check if user exists
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log(existingUser);
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

        console.log("CREATING NEW USER");

        await newUser.save();

        console.log("NEW USER", newUser);
        return done(null, newUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }

      // User.findOrCreate(
      //   { googleId: profile.id },
      //   {
      //     name: {
      //       firstName: profile._json.given_name,
      //       lastName: profile._json.family_name,
      //     },
      //     email: profile._json.email,
      //     avatar: profile._json.picture,
      //     googleId: profile._json.sub,
      //   },
      //   function (err: any, user: any) {
      //     return done(err, profile);
      //   }
      // );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
