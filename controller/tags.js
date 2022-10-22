const { Tags } = require("../models/tags");
const pagination = require("./Pagination");
const { ROLE } = require("../role");

module.exports.tagController = {
  add: async (req, res) => {
    if(res.currUser.role !== ROLE.ADMIN) {
      res.status(401).json({ message: "Unauthorized" });
    }

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
    const { query } = req.query;
    let option = {};
    if (query) {
      option.name = { $regex: query, $options: "i" };
    }

    pagination(req, res, Tags, option);
  },
  getSingleItem: async (req, res) => {
    const tag = await Tags.findById(req.params.id);

    if (tag == null) {
      res.status(400).json({ message: "cant find tags" });
    }
    res.status(200).json({ tag: tag });
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
