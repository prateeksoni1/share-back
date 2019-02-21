const route = require("express").Router();
const User = require("../models/userModel");

route.get("/", (req, res) => {
  const userId = req.query.id;
  console.log("id", userId);
  User.findById(userId).then(user => {
    // console.log(user);
    res.send(user);
  });
});

module.exports = route;
