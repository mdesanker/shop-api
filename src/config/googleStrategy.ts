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
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
        // console.log(accessToken);
        // console.log(profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, profile);
        // })
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
