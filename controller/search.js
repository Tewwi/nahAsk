const Blog = require("../models/blog");

const searchResult = async (req, res) => {
  let p = 1;
  let n = 3;
  if (req.query && req.query.p) {
    p = Number(req.query.p);
  }
  const query = req.query.search;
  const total = await Blog.find({ title: { $regex: query } })
    .count()
    .exec();
  if ((p - 1) * n < total) {
    const blog = await Blog.find({ title: { $regex: query } })
      .sort({ createAt: "desc" })
      .skip((p - 1) * n)
      .limit(n)
      .exec();
    res.status(200).json({ blog: blog });
  } else {
    res.render("blog/not-found");
  }
};

module.exports = searchResult;
