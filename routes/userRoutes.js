var express = require('express');
var userRouter = express.Router();
var db = require('../models');

userRouter.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

userRouter.get('/', (req, res, next) => {
  // console.log("I'm req.user:", req.user);
  console.log('DisplayName: ', req.user.displayName);
  // email optional, probably not to be used
  console.log("I'm email: ", req.user.emails[0].value);
  db.user
    .create({
      username: req.user.displayName,
      picture: req.user._json.image.url
    })
    .then(newUser => {
      if (!newUser) {
        console.log('Error creating user!');
      } else {
        console.log(newUser);
      }
    });
  res.render('users', {
    user: {
      name: req.user.displayName,
      image: req.user._json.image.url
      // email: req.user.emails[0].value
    }
  });
  console.log(req);
});

module.exports = userRouter;
