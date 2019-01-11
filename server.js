const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome");
});

mongoose
  .connect("mongodb://admin:prateek1234@ds251894.mlab.com:51894/fb")
  .then(() => {
    console.log("DB connected");
    app.listen(4444);
  })
  .catch(err => console.log(err));
