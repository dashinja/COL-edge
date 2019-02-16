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
        /////NOTES/////
        // can read updatedAt column? Find most recent?
        // test.

        // past: createdAt: Fri Feb 15 2019 20:14:34 GMT-0500 (Eastern Standard Time)
        // past: updatedAt: Fri Feb 15 2019 20:14:34 GMT-0500 (Eastern Standard Time)

        // After new login Results
        // current: createdAt: SHOULD be the same
        // current: updatedAt: HOPEFULLY will change - results: same... no update

        //// RESEARCH how to update the "updatedAt" time
        // UPDATE user SET updatedAt= date.now()???
        // make a "loginCount" column? Add 1 for each login attempt?
        // must learn how to "add" to a sequel value...
        // this is Sequelize "increment"
        db.user
          .findOne({
            where: {
              username: duplicateFound
            }
          })
          .then(user => {
            // tracks
            // return user.increment('loginCount', { by: 1 });
          })
          .catch(err => console.log(err));
        res.redirect('/profile');
      } else {
        // if user not found
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
        res.redirect('/questions');
      }
    })
    .catch(err => console.log(err));

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
