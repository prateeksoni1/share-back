const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const passport = require("./passport");
const session = require("express-session");
const user = require("./routes/user");
const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser({ extended: true }));
app.use(
  session({
    secret: "riphumanity",
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/user", user);

mongoose
  .connect("mongodb://admin:prateek1234@ds251894.mlab.com:51894/fb", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB connected");
    const PORT = process.env.PORT || 4444;
    app.listen(PORT);
  })
  .catch(err => console.log(err));
