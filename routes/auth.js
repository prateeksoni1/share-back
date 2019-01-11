const route = require("express").Router();

route.post("/", (req, res) => {
  console.log("called");
  console.log(req.body);
});

module.exports = route;
