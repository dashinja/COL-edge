var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render('index');
    // , {
    //   msg: 'Welcome!',
    //   examples: dbExamples
    // });
    // });
  });

  // FIXME: THIS NEEDS TO GO AWAY OR BE USED AS THE ONLY CONTROLLER ON /questions
  // second page reder
  app.get('/questions', function(req, res) {
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    res.render('questions');
    // {
    //     example: dbExample
    //   });
    // });
  });

  // Proper Profile Page Rendering with View Engine
  app.get('/profile', function(req, res) {
    if (!req.user) {
      res.redirect('/');
    } else {
      res.render('profile', {
        user: req.user
      });
    }
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
