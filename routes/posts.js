const route = require("express").Router();
const Post = require("../models/postModel");
route.post("/", (req, res) => {
  console.log("post post");
  const userId = req.body.userId;
  const title = req.body.title;
  const post = req.body.post;
  Post.create({
    userId,
    title,
    post
  }).then(post => {
    res.send(post).status(200);
    console.log(post);
  });
});

route.get("/", (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  Post.find({ userId }).then(posts => {
    console.log(posts);
  });
});

module.exports = route;
