const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const CONSTANTS = require("../constants");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONSTANTS.clientID,
        clientSecret: CONSTANTS.clientSecret,
        callbackURL: CONSTANTS.redirectURI
      },
      (req, accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );
};
