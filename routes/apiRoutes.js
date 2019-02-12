var db = require('../models');

module.exports = function(app) {
  // api/questions deals with question getting
  // and maybe question saving only
  // Route to display all the colleges
  app.get('/api/questions', (req, res) => {
    db.college.findAll({}).then(results => {
      console.log(results);
      res.json(results);
    });
  });

  // Route to display All the majors table
  app.get('/api/questions', (req, res) => {
    db.cost.findAll({}).then(results => {
      console.log(results);
      res.json(results);
    });
  });

  // // Route to create user
  // app.post('/users', (req, res) => {
  //   db.user.create({
  //     user: req.user
  //   });
  // });

  // Get all examples
  app.get('/api/examples', function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post('/api/examples', function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/examples/:id', function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
