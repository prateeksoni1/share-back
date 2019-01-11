const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const app = express();

app.use(bodyParser({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/auth", auth);

mongoose
  .connect(
    "mongodb://admin:prateek1234@ds251894.mlab.com:51894/fb",
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("DB connected");
    app.listen(4444);
  })
  .catch(err => console.log(err));
