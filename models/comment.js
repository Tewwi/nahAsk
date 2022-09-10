const mongoose = require("mongoose");
const { authorType } = require("../utli");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: authorType,
  },
  blogID: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { commentSchema, Comment };
