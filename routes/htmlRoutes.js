const express = require('express');
const htmlRouter = express.Router();
const db = require('../models');

htmlRouter.route('/').get(async (req, res) => {
  const testimonials = await db.indexTestimonial.findAll({})

  res.render('index', { user: req.user, testimonials: testimonials });
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

//Populates all the questions
htmlRouter.route('/questions').get(async (req, res) => {
  const regex = /(https?)(:\/\/)(.*)\//g;
  let leResult;
  req.headers.referer ? (leResult = req.headers.referer.replace(regex, '')) : null;

  if (!req.user) {
    res.redirect('/');
  }

  else if (req.user.majorChoice && leResult !== 'profile') {
    res.redirect('/profile');
  }

  else {
    let allQuestions = {
      major: '',
      cost: '',
    };

    const salaryResults = await db.majorSalaries
      .findAll({ attributes: ['major'] })
      .catch(err => console.log(err));


    allQuestions.major = salaryResults;

    const colResults = await db.costOfLiving
      .findAll({
        attributes: ['city', 'state'],
      }).catch(err => console.log(err));

    allQuestions.cost = colResults;

    res.render('questions', {
      user: req.user,
      answers: allQuestions,
    });
  }
});

// Render 404 page for any unmatched routes
htmlRouter.route('*').get((req, res) => {
  res.render('404');
});

module.exports = htmlRouter;
