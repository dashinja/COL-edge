var db = require('../models');

module.exports = function(app) {
  // api/questions deals with question getting
  // and maybe question saving only
  // Route to display all the majors
  app.get('/api/questions/majors', (req, res) => {
    db.major
      .findAll({ attributes: ['major'] })
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  // Route to display All from livng places
  app.get('/api/questions/livingPlace', (req, res) => {
    db.cost
      .findAll({
        where: {
          country: 'United States'
        },
        attributes: ['city', 'state']
      })

      .then(results => {
        console.log("I'm api/questions/livingPlace: ", results);
        res.json(results);
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  // Liing Place info for Profile
  app.get('/api/profile/livingPlaces', (req, res) => {
    db.cost
      .findAll({})
      .then(results => {
        // cli_including_rent to USD
        let arryCliRentModify = results.map((entry) => {
          entry.cli_plus_rent = ((parseInt(entry.cli_plus_rent) / 100) * 57173).toFixed(2)
        })

        // cli to USD
        let arryCliModify = results.map((entry) => {
          entry.cli = ((parseInt(entry.cli) / 100) * 57173).toFixed(2)
        });

        //CLI to USD
        // results.cli = results.cli * 57173;

        console.log("I'm api/profile/livingPlaces");
        res.json(results);
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  // Major info for Profile
  app.get('/api/profile/majors', (req, res) => {
    db.major
      .findAll({})
      .then(results => {
        console.log("I'm api/profile/majors");
        res.json(results);
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  // // Route to create user
  // app.post('/users', (req, res) => {
  //   db.user.create({
  //     user: req.user
  //   });
  // });

  // Get all examples
  // app.get('/api/examples', function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post('/api/examples', function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete('/api/examples/:id', function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
