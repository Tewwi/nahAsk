const Blog = require("../models/blog");
const { User } = require("../models/user");
const { ROLE } = require("../role");
const pagination = require("./Pagination");

module.exports.userController = {
  show: async (req, res) => {
    const user = await User.findById(req.params.id);
    const blog = await Blog.find({ "author._id": user._id }).populate(
      "tags"
    );

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
  updateUser: async (req, res) => {
    let user = await User.findById(req.params.id);
    const body = req.body;
    user.userName = body.userName;
    user.email = body.email;

    if (req.file) {
      user.avatar = req.file.path;
    }

    if (res.currUser.role === ROLE.ADMIN) {
      user.role = body.role;
    }

    try {
      newUser = await user.save();
      console.log("new", newUser);
      res.status(200).json({ message: "create success" });
    } catch (e) {
      res.status(402).json({ message: "create fail", error: e });
    }
  },
  getCurrentUser: (req, res) => {
    if (res.currUser) {
      res.status(200).json({ user: res.currUser });
    }
  },
};
