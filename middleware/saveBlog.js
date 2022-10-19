function saveBlog(path) {
  return async (req, res) => {
    let blog = req.blog;
    Object.keys(req.body).forEach((key) => {
      blog[key] = req.body[key];
    });
    blog.thumb = req.body.thumb;
    blog.author = res.currUser;
    try {
      blog = await blog.save();
      res.status(200).json({ message: "create success" });
    } catch (e) {
      res.status(402).json({ message: "create fail", error: e });
    }
  };
}

module.exports = saveBlog;
