var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.render('index')
      // , {
      //   msg: 'Welcome!',
      //   examples: dbExamples
      // });
    // });
  });







  // second page reder
  app.get('/secondpage', function(req, res) {
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
      res.render('secondpage') 
      // {
    //     example: dbExample
    //   });
    // });
  });


  app.get('/thirdpage', function(req, res) {
   
      res.render('thirdpage') 
 
  });








  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
