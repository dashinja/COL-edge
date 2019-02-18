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

apiRouter.route('/note').post((req, res) => {
  const key = req.user.username ? 'username' : 'localUsername';
  const value = req.user.username | req.user.localUsername;

  const noteInfo = {
    [key]: value,
    note: req.body.note
  };
  if (!req.user) {
    return;
  } else {
    db.user
      .findOne({
        where: {
          [key]: value
        }
      })
      .then(user => {
        if (user) {
          db.note
            .create(noteInfo)
            .then(note => {})
            .catch(err => console.log(err));
        }
      });
  }
});

apiRouter.route('/chat').post((req, res) => {
  db.chat.create(req.body).then(newMessage => {
    res.send(newMessage);
  });
});

apiRouter.route('/testimony/:dest').post((req, res) => {
  const username = req.user.username || res.user.localUsername;
  const testimony = {
    username,
    testimonial: req.body.testimony
  };
  req.user.picture ? (testimony.image = req.user.picture) : null;
  if (req.params.dest === 'index') {
    db.indexTestimonial.create(req.body).then(newIndexTestimony => {
      res.send(newIndexTestimony);
    });
  } else if (req.params.dest === 'user') {
    db.testimonial.create(testimony).then(newTestimony => {
      res.send(newTestimony);
    });
  }
});

module.exports = apiRouter;
