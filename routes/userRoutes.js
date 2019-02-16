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
  db.user
    .findOne({
      where: {
        username: req.user.displayName
      }
    })
    .then(duplicateFound => {
      if (duplicateFound) {
        db.user
          .findOne({
            where: {
              username: duplicateFound
            }
          })
          .then(user => {})
          .catch(err => console.log(err));
        res.redirect('/profile');
      } else {
        db.user
          .create({
            username: req.user.displayName,
            picture: req.user._json.image.url
          })
          .then(newUser => {
            if (!newUser) {
              console.log('Error creating user!');
            } else {
              console.log("I'm new user: ", newUser.dataValues);
            }
          });
        res.redirect('/questions');
      }
    })
    .catch(err => console.log(err));
});

module.exports = userRouter;
