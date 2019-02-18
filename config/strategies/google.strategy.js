const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const CONSTANTS = require('../constants');
const db = require('../../models');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONSTANTS.clientID,
        clientSecret: CONSTANTS.clientSecret,
        callbackURL: CONSTANTS.redirectURI,
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        if (req.user && !req.user.username) {
          const newInfo = {
            username: profile.displayName,
            picture: profile._json.image.url
          };
          db.user
            .update(newInfo, {
              where: {
                localUsername: req.user.localUsername
              }
            })
            .then(users => {
              done(null, users[0]);
            });
        } else {
          db.user
            .findOne({
              where: {
                username: profile.displayName
              }
            })
            .then(user => {
              if (user) {
                done(null, user.dataValues);
              } else {
                db.user
                  .create({
                    username: profile.displayName,
                    picture: profile._json.image.url
                  })

                  .then(newUser => {
                    done(null, newUser.dataValues);
                  })
                  .catch(err => console.log(err));
              }
            });
        }
      }
    )
  );
};
