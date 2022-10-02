const Blog = require("../models/blog");
const { ROLE } = require("../role");
const pagination = require("./Pagination");

module.exports.blogController = {
  showSingleBlog: async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("comment tags");

    if (blog == null) {
      res.status(400).json({ message: "cant find blogs" });
    }
    res.status(200).json({ blog: blog });
  },
  showApproveBlogs: async (req, res) => {
    pagination(req, res, Blog, { approve: true }, "tags");
  },
  showUnapprovedBlogs: async (req, res) => {
    if (res.currUser.role === ROLE.ADMIN) {
      pagination(req, res, Blog, { approve: false }, "tags");
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  approveBlog: async (req, res) => {
    if (res.currUser.role === ROLE.ADMIN) {
      let blog = await Blog.findById(req.params.id);
      blog.approve = !blog.approve;
      try {
        blog = await blog.save();
        res.status(200).json({ message: "success", blog: blog });
      } catch (e) {
        res.status(402).json({ message: "save fail", error: e });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  add: async (req, res, next) => {
    req.blog = new Blog();
    next();
  },
  update: async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id);
    next();
  },
  delete: async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (
      blog.author._id === res.currUser._id ||
      res.currUser.role === ROLE.ADMIN
    ) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "delete success" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  findByTags: async (req, res) => {
    const blog = await Blog.find({ tags: { $all: req.body.tags } });

    if (blog) {
      res.status(200).json({ message: "search success", blog: blog });
    } else {
      res.status(404).json({ message: "cant find blog" });
    }
  },
};
