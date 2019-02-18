var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', { user: req.user });
  });

  app.get('/signUp', (req, res) => {
    res.render('signUp');
  });
  app.get('/signIn', (req, res) => {
    res.render('signIn');
  });
  app.get('/error', (req, res) => {
    res.render('error', { message: req.flash('loginMessage')[0] });
  });
  // FIXME: THIS NEEDS TO GO AWAY OR BE USED AS THE ONLY CONTROLLER ON /questions
  // second page reder
  // app.get('/questions', function(req, res) {
  //   if (!req.user) {
  //     console.log("No user exists on questions so I'm going to redirect");
  //     res.redirect('/');
  //   } else {
  //     console.log("seems I'm logged in... so go to questions");
  //     res.render('questions');
  //   }
  // });

  // Proper Profile Page Rendering with View Engine
  app.get('/profile', function(req, res) {
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

      if (!req.user.majorChoice) {
        res.render('profile', { user: req.user });
      } else {
        db.user
          .findOne({
            where: {
              [key]: value
            }
          })
          .then(foundUser => {
            // MAGIC
            db.major
              .findOne({
                where: {
                  major: foundUser.majorChoice
                }
              })
              .then(majorRes => {
                //dataValues to truncate only what you need?
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

                      db.note
                        .findAll({
                          where: {
                            username: foundUser.username
                          }
                        })
                        .then(allNotes => {
                          if (allNotes) {
                            res.render('profile', {
                              user: foundUser,
                              userData,
                              notes: allNotes
                            });
                          } else {
                            res.render('profile', {
                              user: foundUser,
                              userData
                            });
                          }
                        });
                    });
                }
              });
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
