const express = require("express");
const router = express.Router();
const { userController } = require("../../controller/user");
const { requireAuth } = require("../../middleware/authMiddleware");

router.get("/all", requireAuth, userController.showAll);
router.get("/:id", userController.show);
router.get("/currentUser", userController.getCurrentUser);

module.exports = router;
