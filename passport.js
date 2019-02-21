const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  console.log("serialize called");
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log("deserialize called", id);
  User.findOne({ _id: id }).then(user => {
    // console.log(user + " in deserializeUser !");
    console.log("inside des ", user);
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      // console.log("local called");
      User.findOne({ email })
        .then(user => {
          // console.log("yo");
          const isValid = bcrypt.compareSync(password, user.password);
          if (!isValid) {
            done(null, false);
          } else {
            done(null, user);
          }
        })
        .catch(err => console.trace(err));
    }
  )
);

module.exports = passport;
