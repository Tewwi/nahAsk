const express = require("express");
const router = express.Router();
const { userController } = require("../../controller/user");
const { requireAuth } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/multer");

router.get("/all", requireAuth, userController.showAll);
router.post(
  "/edit/:id",
  requireAuth,
  upload.single("avatar"),
  userController.updateUser
);
router.get("/current_user", userController.getCurrentUser);
router.get("/:id", userController.show);

module.exports = router;
