const express = require("express");
const router = express.Router();
const { authController } = require("../../controller/auth");
const upload = require("../../middleware/multer");

router.post("/signup", upload.single("avatar"), authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout);

module.exports = router;
