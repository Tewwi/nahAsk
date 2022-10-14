const mongoose = require("mongoose");
const { authorType } = require("../utli");

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
    type: [String],
  },
  thumbPublicIDs: {
    type: [String],
  },
  author: {
    type: authorType,
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
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
