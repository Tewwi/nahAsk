const { commentController } = require("../../controller/comment");
const { requireAuth } = require("../../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/:blogID", commentController.getBlogComment);
router.post("/add", requireAuth, commentController.add);

module.exports = router;
