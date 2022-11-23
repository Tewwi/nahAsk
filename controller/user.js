const Blog = require("../models/blog");
const { User } = require("../models/user");
const { ROLE } = require("../role");
const pagination = require("./Pagination");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports.userController = {
  show: async (req, res) => {
    const user = await User.findById(req.params.id);
    const isAdmin =
      (res.currUser && res.currUser.role === ROLE.ADMIN) ||
      res.currUser?._id === user?._id ||
      false;
    const searchBy = { "author._id": user._id };
    const mongodbQuery = isAdmin ? searchBy : { ...searchBy, approve: true };

    const blog = await Blog.find(mongodbQuery).populate("tags");

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
    } else {
      user.role = ROLE.MEMBER;
    }

    try {
      const newUser = await user.save();
      res.status(200).json({ message: "create success", data: newUser });
    } catch (e) {
      res.status(402).json({ message: "create fail", error: e });
    }
  },
  getCurrentUser: (req, res) => {
    if (res.currUser) {
      res.status(200).json({ user: res.currUser });
    }
  },
  setRole: async (req, res) => {
    let user = await User.findById(new ObjectId(req.params.id));

    if (res.currUser.role === ROLE.ADMIN) {
      if (user.role === ROLE.ADMIN) {
        user.role = ROLE.MEMBER;
      } else {
        user.role = ROLE.ADMIN;
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const newUser = await user.save();
      res.status(200).json({ message: "action success", data: newUser });
    } catch (e) {
      res.status(402).json({ message: "action fail", error: e });
    }
  },
};
