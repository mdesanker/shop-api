import passport from "passport";

const requireGoogleAuth = passport.authenticate("google", { session: false });

export default requireGoogleAuth;
