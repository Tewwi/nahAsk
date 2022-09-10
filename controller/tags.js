const { Tags } = require("../models/tags");
const pagination = require("./Pagination");

module.exports.tagController = {
  add: async (req, res) => {
    let newTag = new Tags();
    newTag.name = req.body.name;
    newTag.description = req.body.description;

    try {
      newTag = await newTag.save();
      res.status(200).json({ message: "create success" });
    } catch (e) {
      res.status(402).json({ message: "create fail", error: e });
    }
  },
  showAll: async (req, res) => {
    pagination(req, res, Tags);
  },
  delete: async (req, res) => {
    if (res.currUser.role === ROLE.ADMIN) {
      await Tags.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "delete success" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};
