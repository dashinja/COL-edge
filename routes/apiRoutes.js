var db = require('../models');

module.exports = function(app) {
  //Populates all the questions
  app.get('/questions', (req, res) => {
    if (!req.user) {
      res.redirect('/');
    } else {
      let allQuestions = {
        major: '',
        cost: ''
      };
      db.major
        .findAll({ attributes: ['major'] })
        .then(results => {
          // res.json(results);
          allQuestions.major = results;

          db.cost
            .findAll({
              where: {
                country: 'United States'
              },
              attributes: ['city', 'state']
            })
            .then(results => {
              // cli_including_rent to USD
              // results.forEach(item => console.table(item));

              let arryCliRentModify = results.map(entry => {
                entry.cli_plus_rent = (
                  (parseInt(entry.cli_plus_rent) / 100) *
                  57173
                ).toFixed();
              });

              // cli to USD
              let arryCliModify = results.map(entry => {
                entry.cli = ((parseInt(entry.cli) / 100) * 57173).toFixed();
              });
              console.log(results.dataValues);
              allQuestions.cost = results;
              res.render('questions', {
                user: req.user,
                answers: allQuestions
              });
              // res.json(results);
            })
            .catch(err => console.log(err));
          // .catch(err => console.log(err))

          // res.render("questions", {})
        })
        .catch(err => console.log(err));
    }
  });

  // Route to display All from livng places
  // app.get('/questions', (req, res) => {
  //   db.cost
  //     .findAll({
  //       where: {
  //         country: 'United States'
  //       },
  //       attributes: ['city', 'state']
  //     })

  //     .then(results => {
  //       // console.log("I'm api/questions/livingPlace: ", results);
  //       res.json(results);
  //     })
  //     .catch(err => console.log(err));
  // });

  // // Living Place info for Profile
  // // app.get('/api/profiles/livingPlaces', (req, res) => {
  // app.get('/questions', (req, res) => {
  //   db.cost
  //     .findAll({})
  //     .then(results => {
  //       // cli_including_rent to USD
  //       let arryCliRentModify = results.map(entry => {
  //         entry.cli_plus_rent = (
  //           (parseInt(entry.cli_plus_rent) / 100) *
  //           57173
  //         ).toFixed();
  //       });

  //       // cli to USD
  //       let arryCliModify = results.map(entry => {
  //         entry.cli = ((parseInt(entry.cli) / 100) * 57173).toFixed();
  //       });
  //       console.log(results.dataValues);
  //       res.render('questions', { cost: results });
  //       // res.json(results);
  //     })
  //     .catch(err => console.log(err));
  // });

  // Major info for Profile
  // app.get('/api/profiles/majors', (req, res) => {
  //   db.major
  //     .findAll({})
  //     .then(results => {
  //       // console.log("I'm api/profile/majors");
  //       let majorSalarySigFig = results.map(item => {
  //         item.starting_salary = parseInt(item.starting_salary).toFixed();
  //         item.mid_career_salary = parseInt(item.mid_career_salary).toFixed();
  //       });
  //       res.json(results);
  //     })
  //     .catch(err => console.log(err));
  // });

  app.post('/api/user/answers', (req, res, next) => {
    // req bodyshould have selections from user
    // res.json(req.body);
    let addUserChoice = {
      // collegeChoice: req.body.collegeChoice,
      majorChoice: req.body.major,
      cityChoice: req.body.cost
      // stateChoice: req.body.stateChoice
    };
    console.log('req.user.username: ');
    console.log(req.user.username);
    db.user
      .findOne({
        where: {
          username: req.user.username
        }
      })
      .then(user => {
        if (user) {
          db.user.update(addUserChoice, {
            where: {
              username: req.user.username
            }
          });
          res.json('/profile');
        }
      })
      // .then(() => res.render("profile"))
      .catch(err => console.log(err));

    let testimonialHolder = [];
    // User Testimonial
    app.post('/api/user/testimony', (req, res) => {
      console.log("I'm req.body:");
      console.log(req.body);
      // console.log("I'm req");
      // console.log(req);

      if (!req.user) {
        return;
      } else {
        let userTestimonial = req.body;

        // userTestimonial = userTestimonial.keys()
        console.log("I'm keys userTestimonial");
        console.log(Object.keys(userTestimonial));
        let newUserTestimonial = Object.keys(userTestimonial);
        console.log("I'm newUserTestimonial[0]");
        console.log(newUserTestimonial[0]);

        userTestimonial = newUserTestimonial[0];
        console.log("I'm newUserTestimonial");
        console.log(userTestimonial);

        let updateObject = {
          notes: userTestimonial
        };
        console.log("I'm updateObject before push");
        console.log(updateObject);
        testimonialHolder.push(updateObject.notes);
        console.log("I'm testimonialHolder");
        console.log(testimonialHolder);
        db.user
          .findOne({
            where: {
              username: req.user.username
            }
          })
          .then(user => {
            if (user) {
              db.user
                .update(
                  { notes: userTestimonial },
                  {
                    where: {
                      username: req.user.username
                    }
                  }
                )
                .then(() => {
                  // console.log("I'm updateObject");
                  // console.log(updateObject);
                  res.json(testimonialHolder);
                  // res.render("index", {testimony: testimonialHolder})
                  // console.log(
                  //   'Tell me, what of userTestimonials?:',
                  //   userTestimonial
                  // );
                  // res.render('index', {
                  //   user: updateObject,
                  //   notes: userTestimonial
                  // });
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      }
    });

    // Create a note
    app.post('/api/user/note', (req, res) => {
      console.log(req.body);

      let noteInfo = {
        username: req.user.username,
        note: req.body.note
      };

      if (!req.user) {
        return;
      } else {
        db.user
          .findOne({
            where: {
              username: req.user.username
            }
          })
          .then(user => {
            if (user) {
              db.note
                .create(noteInfo)
                .then(newNote => {
                  console.log('newNote is:');
                  console.log(newNote);
                  // res.status(201);
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      }
    });

    // Updates a note
    app.post('/api/user/note', (req, res) => {
      console.log(req.body);

      let noteInfo = {
        username: req.user.username,
        note: req.body
      };

      if (!req.user) {
        return;
      } else {
        db.user
          .findOne({
            where: {
              username: req.user.username
            }
          })
          .then(user => {
            if (user) {
              db.note
                .update(noteInfo, {
                  where: {
                    username: req.user.username
                  }
                })
                .then(() => {
                  res.status(201);
                })
                .catch(err => console.log(err));
            }
          });
      }
    });

    //needs to know which user?
    // or simplify, since no perfect auth focus:
    // last...
    //   db.user
    //     .update(addUserChoice, {
    //       where: {
    //         id: req.params.id // problem, do by name instead?
    //       }
    //     })
    //     .then(() => {
    //       res.status(201);
    //       res.end(res.status);
    //     })
    //     // .catch(err => {
    //     //   console.log(err);
    //     //   res.status(500);
    //     //   res.end(res.status);
    //     // });
    //     .then(() => {
    //       db.user
    //         .findOne({
    //           where: {
    //             id: req.params.body
    //           }
    //         })
    //         .then(result => {
    //           // should return data to client of the updated User object
    //           res.json(result);
    //         })
    //         .catch(err => console.log(err));
    //     })
    //     .catch(err => console.log(err));
    // });

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
  });
};
