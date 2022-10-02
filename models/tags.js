const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter an tag name"],
  },
  description: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tags = mongoose.model("Tags", tagsSchema, "tags");
module.exports = { tagsSchema, Tags };
