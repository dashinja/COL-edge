const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const db = require('../models');

authRouter.route('/google').get(
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      '',
    ],
  })
);
authRouter.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/questions',
    failureRedirect: '/error',
  })
);

authRouter.route('/local').get(passport.authenticate('local'));

authRouter.route('/local/signUp').post((req, res) => {
  const { localUsername, localPassword } = req.body;
  db.user
    .findOne({
      where: {
        localUsername,
      },
    })
    .then(user => {
      if (user) {
        res.send('Username already in use.');
      } else {
        const newUser = {
          localUsername,
          localPassword,
        };
        db.user.create(newUser).then(userRes => {
          req.login(req.body, () => {
            res.redirect('/questions');
          });
        });
      }
    });
});

authRouter
  .route('/local/signIn')
  .get((req, res) => {
    res.render('siginIn');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/questions',
      failureRedirect: '/error',
      failureFlash: true,
    })
  );

authRouter.route('/logout').get((req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = authRouter;
