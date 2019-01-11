const route = require("express").Router();

console.log("here");
route.post("/", (req, res) => {
  console.log("called");
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.send("ok");
});

module.exports = route;
