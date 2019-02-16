const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.route('/google').get(
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      ''
    ]
  })
);
authRouter.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  })
);

authRouter.route('/logout').get((req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = authRouter;
