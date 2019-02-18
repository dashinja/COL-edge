const express = require('express');
const htmlRouter = express.Router();
var db = require('../models');

htmlRouter.route('/').get((req, res) => {
  db.indexTestimonial.findAll({}).then(testimonials => {
    res.render('index', { user: req.user, testimonials: testimonials });
  });
});

htmlRouter.route('/signUp').get((req, res) => {
  res.render('signUp');
});

htmlRouter.route('/signIn').get((req, res) => {
  res.render('signIn');
});

htmlRouter.route('/error').get((req, res) => {
  res.render('error', { message: req.flash('loginMessage')[0] });
});

// Populates all the questions
htmlRouter.route('/questions').get((req, res) => {
  if (!req.user) {
    res.redirect('/');
  } else if (req.user.majorChoice) {
    res.redirect('/profile');
  } else {
    let allQuestions = {
      major: '',
      cost: ''
    };
    db.major
      .findAll({ attributes: ['major'] })
      .then(results => {
        allQuestions.major = results;

        db.cost
          .findAll({
            where: {
              country: 'United States'
            },
            attributes: ['city', 'state']
          })
          .then(results => {
            let arryCliRentModify = results.map(entry => {
              entry.cli_plus_rent = (
                (parseInt(entry.cli_plus_rent) / 100) *
                57173
              ).toFixed();
            });

            let arryCliModify = results.map(entry => {
              entry.cli = ((parseInt(entry.cli) / 100) * 57173).toFixed();
            });
            allQuestions.cost = results;
            res.render('questions', {
              user: req.user,
              answers: allQuestions
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
});

// Render 404 page for any unmatched routes
htmlRouter.route('*').get((req, res) => {
  res.render('404');
});

module.exports = htmlRouter;
