const Blog = require("../models/blog");
const { User } = require("../models/user");
const { ROLE } = require("../role");
const pagination = require("./Pagination");

module.exports.userController = {
  show: async (req, res) => {
    const user = await User.findById(req.params.id);
    const blog = await Blog.find({ userId: user._id }).populate("tags");
    if (user) {
      const { password, ...infoUser } = user.toObject();
      res.status(200).json({ user: infoUser, blog: blog });
    } else {
      res.status(404).json({ message: "cant find users" });
    }
  },
  showAll: async (req, res) => {
    pagination(req, res, User);
  },
  getCurrentUser: (req, res) => {
    if (res.currUser) {
      res.status(200).json({ user: res.currUser });
    }
  },
};
