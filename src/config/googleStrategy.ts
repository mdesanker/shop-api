import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

interface GoogleStrategyTypes {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: "/auth/google/redirect",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOrCreate(
          { googleId: profile.id },
          {
            name: {
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
            },
            email: profile._json.email,
            picture: profile._json.picture,
          },
          function (err: any, user: any) {
            return done(err, profile);
          }
        );
      }
    )
  );
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
