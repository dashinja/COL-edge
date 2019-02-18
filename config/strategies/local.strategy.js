const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require('../../models');

module.exports = () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, localUsername, localPassword, done) => {
        db.user
          .findOne({
            where: {
              localUsername: username
            }
          })
          .then(user => {
            if (user) {
              if (user.localPassword === password) {
                done(null, user);
              } else {
                done(
                  null,
                  false,
                  req.flash('loginMessage', 'Passwords do not match.')
                );
              }
            } else {
              done(null, false, req.flash('loginMessage', 'User not found'));
            }
          });
      }
    )
  );
};
