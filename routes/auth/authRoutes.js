const express = require("express");
const router = express.Router();
const { authController } = require("../../controller/auth");

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout);

module.exports = router;
