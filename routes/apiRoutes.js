const express = require('express');
const apiRouter = express.Router();
var db = require('../models');

apiRouter.route('/user/answers').post((req, res, next) => {
  let addUserChoice = {
    majorChoice: req.body.major,
    cityChoice: req.body.cost
  };
  const key = req.user.username ? 'username' : 'localUsername';
  const value = req.user.username || req.user.localUsername;

  db.user
    .findOne({
      where: {
        [key]: value
      }
    })
    .then(user => {
      if (user) {
        db.user.update(addUserChoice, {
          where: {
            [key]: value
          }
        });
        res.json('/profile');
      }
    })
    .catch(err => console.log(err));
});

apiRouter.route('/chat').post((req, res) => {
  db.chat.create(req.body).then(newMessage => {
    res.send(newMessage);
  });
});

module.exports = apiRouter;
