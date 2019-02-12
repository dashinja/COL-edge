require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const CONSTANTS = require("./constants");
const authRouter = require("./routes/authRoutes");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: "Bootcamp for life" }));

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: CONSTANTS.clientID,
      clientSecret: CONSTANTS.clientSecret,
      callbackURL: CONSTANTS.redirectURI
    },
    (req, accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Serialize and Unserialize
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
app.use("/auth", authRouter);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
