const express = require("express");
const router = express.Router();
const { authController } = require("../../controller/auth");
const signCloud = require("../../middleware/signCloudinary");
const { requireAuth } = require("../../middleware/authMiddleware");

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/change_password", requireAuth, authController.change_password);
router.get("/sign_cloudinary", signCloud);
router.get("/logout", authController.logout);

module.exports = router;
