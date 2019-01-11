const route = require("express").Router();

console.log("here");
route.post("/", (req, res) => {
  console.log("called");
  console.log(req.body);
});

module.exports = route;
