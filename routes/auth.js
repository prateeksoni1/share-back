const route = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const passport = require("../passport");

console.log("here");

route.get("/", (req, res) => {
  console.log("called get");
  console.log(req.isAuthenticated()); //ye false aa rha h

  // console.log(req.user + " in nice url");
  if (req.user) {
    return res.send({ user: req.user });
  }
  return res.send({ user: null });
});

route.post("/signup", (req, res) => {
  console.log("called");
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;

  const hashedPassword = bcrypt.hashSync(password, 12);

  User.findOne({ email }).then(user => {
    if (user) {
      return res.send({ error: "Email already exists" });
    } else {
      const user = User.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender
      });
      user.then(user => {
        console.log("Saved to db");
        res.send("ok");
      });
    }
  });
});

route.post("/login", (req, res, next) => {
  // console.log("Login called");
  passport.authenticate("local", (err, user, info) => {
    // console.log("authenticate block");
    if (err) {
      return res.send({ success: false });
      // return next(err);
    }
    if (!user) {
      // console.log(info);
      return res.send({
        success: false
        // message: info.message
      });
    }

    req.logIn(user, err => {
      if (err) {
        return res.send({ success: false, message: err });
      }
      // console.log(req.user + " in login");
      // console.log("login success");
      // console.log(req.session.passport);
      console.log(req.isAuthenticated()); //ye sahi dchal rha h
      res.send({
        success: true,
        message: "Login success"
      });
      // res.redirect("/");
    });
  })(req, res, next);
});

route.get("/logout", (req, res) => {
  req.logOut();
  console.log("logged out");
  res.status(200).send({ loggedIn: false });
});

module.exports = route;
