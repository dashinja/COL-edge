var db = require("../models");

module.exports = function(app) {
  // oAuth
  app.get("/", function(req, res) {
    res.render("users", {
      user: {
        name: req.user.displayName,
        image: req.user._json.image.url
      }
    });
    
    // Load index page
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
