const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  console.log("serialize called");
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log("deserialize called");
  User.findById(id).then((err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      console.log("local called");
      User.findOne({ email }).then(user => {
        console.log("yo");
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          done(null, false);
        } else {
          done(null, user);
        }
      });
    }
  )
);

module.exports = passport;
