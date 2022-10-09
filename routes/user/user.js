const express = require("express");
const router = express.Router();
const { userController } = require("../../controller/user");
const { requireAuth } = require("../../middleware/authMiddleware");

router.get("/all", requireAuth, userController.showAll);
router.get("/current_user", userController.getCurrentUser);
router.get("/:id", userController.show);

module.exports = router;
