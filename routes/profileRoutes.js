const express = require('express');
const profileRouter = express.Router();
const db = require('../models');

profileRouter.route('/').get(async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    let userData = {
      user: req.user,
      major: {},
      cost: {},
    };

    const key = req.user.username ? 'username' : 'localUsername';
    const value = req.user.username || req.user.localUsername;

    const found = await db.user
      .findOne({
        where: {
          [key]: value,
        },
      })

    userData.user = found.dataValues;

    if (!userData.user.majorChoice) {
      res.render('profile', { user: userData.user });
    }
    else {
      const foundUser = await db.user
        .findOne({
          where: {
            [key]: value,
          },
        })

      const majorRes = await db.majorSalaries
        .findOne({
          where: {
            major: foundUser.majorChoice,
          },
        })

      userData.major = majorRes.dataValues;

      if (!foundUser.cityChoice) {
        null;
      } else {
        const cityRes = await db.costOfLiving
          .findOne({
            where: {
              city: foundUser.cityChoice,
            },
          })

        const cityResults = cityRes.dataValues;

        cityResults.costOfLivingPlusRent = (
          (parseInt(cityRes.dataValues.costOfLivingPlusRent) / 100) *
          57173
        ).toFixed();

        cityResults.costOfLivingIndex = (
          (parseInt(cityRes.dataValues.costOfLivingIndex) / 100) *
          57173
        ).toFixed();

        userData.cost = cityResults;

        const chats = await db.chat.findAll({})

        const fullChat = {
          comments: [],
        };

        chats.forEach(c => fullChat.comments.push(c));

        const testimonial = await db.testimonial
          .findOne({
            where: {
              username: value,
            },
          })

        const allNotes = await db.note
          .findAll({
            where: {
              [key]: value,
            },
          })

        if (allNotes) {
          res.render('profile', {
            user: foundUser,
            userData,
            fullChat,
            testimonial,
            notes: allNotes,
          });
        }
        else {
          res.render('profile', {
            user: foundUser,
            userData,
            fullChat,
            testimonial,
          });
        }
      }
    }
  }
});

profileRouter.route('/:username/stats').get(async (req, res) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    const key = req.user.username ? 'username' : 'localUsername';

    const user = await db.user
      .findOne({
        where: {
          [key]: req.params.username,
        },
      })

    if (!user.majorChoice) {
      res.redirect('/profile');
    }
    else {
      const cityRes = await db.costOfLiving
        .findOne({
          where: {
            city: user.cityChoice,
          },
        })

      const cityResults = cityRes.dataValues;
      const cities = await db.costOfLiving.findAll({})
      
      res.render('stats', { user, cityResults, cities });
    }
  }
});

module.exports = profileRouter;
