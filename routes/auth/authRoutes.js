const express = require("express");
const router = express.Router();
const { authController } = require("../../controller/auth");
const upload = require("../../middleware/multer");
const signCloud = require("../../middleware/signCloudinary");

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/sign_cloudinary", signCloud);
router.get("/logout", authController.logout);

module.exports = router;
