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
  // console.log('DisplayName: ', req.user.displayName);
  // email optional, probably not to be used
  // console.log("I'm email: ", req.user.emails[0].value);

  db.user
    .findOne({
      where: {
        username: req.user.displayName
      }
    })
    .then(duplicateFound => {
      // console.log(duplicateFound);
      if (duplicateFound) {
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
              console.log('Hi instead');
            }
          });
        // res.render('users', {
        //   user: {
        //     name: req.user.displayName,
        //     image: req.user._json.image.url
        //     // email: req.user.emails[0].value
        //   }
        // });
        res.redirect('/profile');
      }
    });

  // db.user.create({
  //   username: req.user.displayName,
  //   picture: req.user._json.image.url
  // }).then(newUser => {
  //   if (!newUser) {
  //     console.log('Error creating user!');
  //   } else {
  //     console.log("I'm new user: ", newUser.dataValues);
  //     console.log('Hi instead');
  //   }
  // });
  // res.render('users', {
  //   user: {
  //     name: req.user.displayName,
  //     image: req.user._json.image.url
  //     // email: req.user.emails[0].value
  //   }
  // });
  // console.log(req);
});

module.exports = userRouter;
