const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: String,
  title: {
    type: String,
    required: true
  },
  tags: String,
  post: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);
