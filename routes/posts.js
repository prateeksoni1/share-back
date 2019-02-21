const route = require("express").Router();
const Post = require("../models/postModel");
route.post("/", (req, res) => {
  console.log("post post");
  const userId = req.body.userId;
  const title = req.body.title;
  const post = req.body.post;
  const tags = req.body.tags;
  Post.create({
    userId,
    title,
    post,
    tags
  }).then(post => {
    res.send(post).status(200);
    console.log(post);
  });
});

route.get("/", (req, res) => {
  const userId = req.query.id;
  if (userId === undefined) {
    Post.find().then(posts => {
      res.send(posts);
    });
  } else {
    console.log(userId);
    Post.find({ userId }).then(posts => {
      res.send(posts);
    });
  }
});

module.exports = route;
