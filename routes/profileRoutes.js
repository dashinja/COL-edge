const express = require('express');
const profileRouter = express.Router();
const db = require('../models');

profileRouter.route('/').get((req, res) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    let userData = {
      user: req.user,
      major: {},
      cost: {}
    };
    const key = req.user.username ? 'username' : 'localUsername';
    const value = req.user.username || req.user.localUsername;

    db.user
      .findOne({
        where: {
          [key]: value
        }
      })
      .then(found => {
        userData.user = found.dataValues;
        if (!userData.user.majorChoice) {
          res.render('profile', { user: userData.user });
        } else {
          db.user
            .findOne({
              where: {
                [key]: value
              }
            })
            .then(foundUser => {
              db.major
                .findOne({
                  where: {
                    major: foundUser.majorChoice
                  }
                })
                .then(majorRes => {
                  userData.major = majorRes.dataValues;

                  if (!foundUser.cityChoice) {
                    null;
                  } else {
                    db.cost
                      .findOne({
                        where: {
                          city: foundUser.cityChoice
                        }
                      })
                      .then(cityRes => {
                        const cityResults = cityRes.dataValues;
                        cityResults.cli_plus_rent = (
                          (parseInt(cityRes.dataValues.cli_plus_rent) / 100) *
                          57173
                        ).toFixed();

                        cityResults.cli = (
                          (parseInt(cityRes.dataValues.cli) / 100) *
                          57173
                        ).toFixed();
                        userData.cost = cityResults;
                        db.chat.findAll({}).then(chats => {
                          const fullChat = {
                            comments: []
                          };
                          chats.forEach(c => fullChat.comments.push(c));

                          db.note
                            .findAll({
                              where: {
                                [key]: value
                              }
                            })
                            .then(allNotes => {
                              if (allNotes) {
                                res.render('profile', {
                                  user: foundUser,
                                  userData,
                                  fullChat,
                                  notes: allNotes
                                });
                              } else {
                                res.render('profile', {
                                  user: foundUser,
                                  userData,
                                  fullChat
                                });
                              }
                            });
                        });
                      });
                  }
                });
            });
        }
      });
  }
});

module.exports = profileRouter;
