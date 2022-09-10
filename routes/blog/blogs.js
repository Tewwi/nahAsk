const express = require("express");
const saveBlog = require("../../middleware/saveBlog");
const upload = require("../../middleware/multer");
const router = express.Router();
const { blogController } = require("../../controller/blog");
const { requireAuth } = require("../../middleware/authMiddleware");

router.get("/", blogController.showApproveBlogs);

router.get("/unapproved", requireAuth, blogController.showUnapprovedBlogs);

router.get("/:id", blogController.showSingleBlog);

router.get("/approve/:id", requireAuth, blogController.approveBlog);

router.post("/search", blogController.findByTags);

router.post(
  "/",
  requireAuth,
  blogController.add,
  upload.array("thumb"),
  saveBlog()
);

router.put(
  "edit/:id",
  requireAuth,
  upload.array("thumb"),
  blogController.update,
  saveBlog()
);

router.delete("/:id", requireAuth, blogController.delete);

module.exports = router;
