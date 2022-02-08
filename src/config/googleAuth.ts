import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

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
      (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, profile);
        // })
      }
    )
  );
};
