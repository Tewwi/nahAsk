const Blog = require("../models/blog");
const { Comment } = require("../models/comment");
const { ROLE } = require("../role");

module.exports.commentController = {
  add: async (req, res) => {
    if (res.currUser.isBlock) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let comment = new Comment();
    let blog = await Blog.findById(req.body.blogID);
    if (!blog) {
      res.status(404).json({ message: "cant find blog" });
    }
    comment.body = req.body.body;
    comment.author = res.currUser;
    comment.blogID = req.body.blogID;

    try {
      comment = await comment.save();
      blog.comment = blog.comment.concat(comment._id);
      blog = await blog.save();

      res.status(200).json({ message: "create success", blog: blog });
    } catch (e) {
      res.status(402).json({ message: "create fail", error: e });
    }
  },
  getBlogComment: async (req, res) => {
    const comments = await Comment.find({ blogID: req.params.blogID });

    if (comments) {
      res.status(200).json({
        message: "success",
        comments: comments,
        length: comments.length,
      });
    } else {
      res.status(404).json({ message: "Cant find" });
    }
  },
  delete: async (req, res) => {
    if (res.currUser.role === ROLE.ADMIN) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "delete success" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  hiddenComment: async (req, res) => {
    if (res.currUser.role === ROLE.ADMIN) {
      const comment = await Comment.findById(req.params.id);
      comment.isHidden = !comment.isHidden;

      try {
        const newData = await comment.save();
        res.status(200).json({ message: "Hidden success", comment: newData });
      } catch (error) {
        res.status(402).json({ message: "Hidden fail" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};
