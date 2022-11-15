const mongoose = require("mongoose");
const { authorType, imgType } = require("../utli");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  thumb: {
    type: [imgType],
  },
  author: {
    type: authorType,
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  },
  answer: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  comment: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  approve: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
