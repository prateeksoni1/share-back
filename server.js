const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const app = express();

app.use(bodyParser({ extended: true }));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
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
    const PORT = process.env.PORT || 4444;
    app.listen(PORT);
  })
  .catch(err => console.log(err));
