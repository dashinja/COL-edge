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
      /*MAKE QUERIES TO GET FULL DATA DISPLAY OBJECTS FROM DATABASE BASED ON INFO HELD ON USER OBJECT */
      console.log('req.user on profile page load');
      console.log(req.user);
      let userData = {
        user: req.user,
        major: '',
        cost: ''
      };

      db.major
        .findOne({
          where: {
            major: req.user.majorChoice
          }
        })
        .then(fullMajorRow => {
          console.log("\nI'm fullMajorRow");
          console.log(fullMajorRow.dataValues);
          userData.major = fullMajorRow.dataValues;
          console.log("\n I'm userData with .major updated");
          console.log(userData);

          db.cost
            .findOne({
              where: {
                city: req.user.cityChoice
              }
            })
            .then(fullCostRow => {
              console.log("\nI'm fullCostRow");
              console.log(fullCostRow.dataValues);
              // cli_including_rent to USD
              fullCostRow.dataValues.cli_plus_rent = (
                (parseInt(fullCostRow.dataValues.cli_plus_rent) / 100) *
                57173
              ).toFixed();

              console.log("\nI'm calculated fullCostRow for cli_plus_rent");
              console.log(fullCostRow.dataValues);

              // cli to USD
              fullCostRow.dataValues.cli = (
                (parseInt(fullCostRow.dataValues.cli) / 100) *
                57173
              ).toFixed();

              console.log("\nI'm calculated fullCostRow for cli");
              console.log(fullCostRow.dataValues);

              userData.cost = fullCostRow.dataValues;
              console.log("\n I'm userData with .cost updated");
              console.log(userData);
              // res.render('profile', userData);
            })
            .then(() => {
              console.log("\nI'm userData:");
              console.log(userData);
              res.render('profile', userData);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
