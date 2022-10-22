const Blog = require("../models/blog");

const searchResult = async (req, res) => {
  let p = 1;
  let n = 10;
  if (req.query && req.query.p) {
    p = Number(req.query.p);
  }
  const { query, tag } = req.query;
  const isAdmin = res.currUser && res.currUser.role === ROLE.ADMIN;

  const searchBy = {
    title: { $regex: query || "", $options: "i" },
    tags: tag ? { $all: tag } : { $exists: true },
  };

  const mongodbQuery = isAdmin ? searchBy : { ...searchBy, approve: true };

  const total = await Blog.find(mongodbQuery).count().exec();

  if ((p - 1) * n < total) {
    const blog = await Blog.find(mongodbQuery)
      .sort({ createAt: "desc" })
      .skip((p - 1) * n)
      .limit(n)
      .populate("tags")
      .exec();

    res.status(200).json({ blog: blog, total: total });
  } else {
    res.status(400).json({ message: "cant find" });
  }
};

module.exports = searchResult;
