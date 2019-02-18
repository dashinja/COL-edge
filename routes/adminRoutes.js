const express = require('express');
const adminRouter = express.Router();
const db = require('../models');

adminRouter.route('/').get((req, res) => {
  if (!req.user.admin) {
    res.redirect('/profile');
  } else {
    const key = req.user.username ? 'username' : 'localUsername';
    const value = req.user.username || req.user.localUsername;

    db.user
      .findOne({
        where: {
          [key]: value,
        },
      })
      .then(found => {
        db.testimonial.findAll({}).then(testimonials => {
          db.indexTestimonial.findAll({}).then(indexTestimonials => {
            res.render('admin', {
              user: found.dataValues,
              testimonials: testimonials,
              indexTestimonials: indexTestimonials,
            });
          });
        });
      });
  }
});

module.exports = adminRouter;
