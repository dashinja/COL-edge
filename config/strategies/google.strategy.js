const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const CONSTANTS = require('../constants');
const db = require('../../models');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONSTANTS.clientID,
        clientSecret: CONSTANTS.clientSecret,
        callbackURL: CONSTANTS.redirectURI,
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        // MAGIC
        /* const user = {
          displayName: profile.displayName,
          image: profile._json.image.url,
          major: 'Gold Leader'
        }; */

        // CHECK THE DB TO SEE IF THERE IS A USER THAT MATCHES THE USER THAT IS LOGGED IN
        if (req.user && !req.user.username) {
          const newInfo = {
            username: profile.displayName,
            picture: profile._json.image.url
          };
          db.user
            .update(newInfo, {
              where: {
                localUsername: req.user.localUsername
              }
            })
            .then(users => {
              done(null, users[0]);
            });
        } else {
          db.user
            .findOne({
              where: {
                // id: profile.id
                username: profile.displayName
              }
            })
            // IF THERE IS A USER MATCHING
            .then(user => {
              if (user) {
                // SEND THE USER INFO IN THE DONE CALLBACK (i.e. done(null, user))
                console.log('I found that user');
                console.log('user data values are');
                console.log(user.dataValues);
                done(null, user.dataValues);
              } else {
                console.log('I did not find that user');
                // IF THERE IS NOT A USER MATCHING
                // CREATE THE USER IN THE DB
                db.user
                  .create({
                    // id: profile.id,
                    username: profile.displayName,
                    picture: profile._json.image.url
                  })
                  // SEND THE USER INFO IN THE DONE CALLBACK (i.e. done(null, newUser))
                  .then(newUser => {
                    console.log('So I am making the user');
                    console.log(newUser.dataValues);
                    done(null, newUser.dataValues);
                  })
                  .catch(err => console.log(err));
              }
            });
        }

        // db.user
        // .create({
        //   username: profile.displayName,
        //   picture: profile._json.image.url
        // })
        // .then(newUser => {
        //   if (!newUser) {
        //     console.log('Error creating user!');
        //   } else {
        //     console.log("I'm new user that got created:", newUser.dataValues);
        //   }
        // });
      }
    )
  );
};
