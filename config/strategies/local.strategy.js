const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require('../../models');

module.exports = () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'localUsername',
        passwordField: 'localPassword',
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        db.user
          .findOne({
            where: {
              localUsername: username,
            },
          })
          .then(user => {
            if (user) {
              if (user.localPassword === password) {
                done(null, user);
              } else {
                done(null, false, req.flash('loginMessage', 'Passwords do not match.'));
              }
            } else {
              done(null, false, req.flash('loginMessage', 'User not found.'));
            }
          });
      }
    )
  );
};
