const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const passport = require("./passport");
const session = require("express-session");
const app = express();

app.use(bodyParser({ extended: true }));
app.use(
  session({ secret: "riphumanity", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/auth", auth);
app.use("/api/posts", posts);

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
