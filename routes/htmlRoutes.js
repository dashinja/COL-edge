var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', { user: req.user });
  });

  // FIXME: THIS NEEDS TO GO AWAY OR BE USED AS THE ONLY CONTROLLER ON /questions
  // second page reder
  app.get('/questions', function(req, res) {
    res.render('questions');
  });

  // Proper Profile Page Rendering with View Engine
  app.get('/profile', function(req, res) {
    if (!req.user) {
      res.redirect('/');
    } else {
      res.render('profile', { user: req.user });
      // console.log('req.user on profile page load');
      // console.log(req.user);
      let userData = {
        user: req.user,
        major: {},
        cost: {}
      };

      if (!req.user.majorChoice) {
        null;
      } else {
        // MAGIC
        db.major
          .findOne({
            where: {
              major: req.user.majorChoice
            }
          })
          .then(majorRes => {
            //dataValues to truncate only what you need?
            userData.major = majorRes.dataValues;

            if (!req.user.cityChoice) {
              null;
            } else {
              db.cost
                .findOne({
                  where: {
                    city: req.user.cityChoice
                  }
                })
                .then(cityRes => {
                  const leResultsDeCity = cityRes.dataValues;
                  leResultsDeCity.cli_plus_rent = (
                    (parseInt(cityRes.dataValues.cli_plus_rent) / 100) *
                    57173
                  ).toFixed();

                  leResultsDeCity.cli = (
                    (parseInt(cityRes.dataValues.cli) / 100) *
                    57173
                  ).toFixed();
                  userData.cost = leResultsDeCity;
                  console.log('user data en corso')
                  console.log(userData)
                });
            }
          });
      }

      /* db.major
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
              // console.log("\nI'm fullCostRow");
              // console.log(fullCostRow.dataValues);
              // cli_including_rent to USD
              fullCostRow.dataValues.cli_plus_rent = (
                (parseInt(fullCostRow.dataValues.cli_plus_rent) / 100) *
                57173
              ).toFixed();

              // console.log("\nI'm calculated fullCostRow for cli_plus_rent");
              // console.log(fullCostRow.dataValues);

              // cli to USD
              fullCostRow.dataValues.cli = (
                (parseInt(fullCostRow.dataValues.cli) / 100) *
                57173
              ).toFixed();

              // console.log("\nI'm calculated fullCostRow for cli");
              // console.log(fullCostRow.dataValues);

              userData.cost = fullCostRow.dataValues;
              // console.log("\n I'm userData with .cost updated");
              // console.log(userData);
              // res.render('profile', userData);
            })
            .then(() => {
              console.log("\nI'm userData:");
              console.log(userData);
              res.render('profile', userData);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err)); */
    }
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
