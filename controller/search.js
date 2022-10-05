const Blog = require("../models/blog");

const searchResult = async (req, res) => {
  let p = 1;
  let n = 10;
  if (req.query && req.query.p) {
    p = Number(req.query.p);
  }
  const { query } = req.query;
  const total = await Blog.find({ title: { $regex: query, $options: "i" } })
    .count()
    .exec();

  const mongodbQuery =
    res.currUser && res.currUser.role === ROLE.ADMIN
      ? {
          title: { $regex: query, $options: "i" },
        }
      : {
          title: { $regex: query, $options: "i" },
          approve: true,
        };

  if ((p - 1) * n < total) {
    const blog = await Blog.find(mongodbQuery)
      .sort({ createAt: "desc" })
      .skip((p - 1) * n)
      .limit(n)
      .populate("tags")
      .exec();
    res.status(200).json({ blog: blog, total: total.length });
  } else {
    res.status(400).json({ message: "cant find" });
  }
};

module.exports = searchResult;
