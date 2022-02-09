import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOrCreate(
        { googleId: profile.id },
        {
          name: {
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
          },
          email: profile._json.email,
          avatar: profile._json.picture,
          googleId: profile._json.sub,
        },
        function (err: any, user: any) {
          return done(err, profile);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
