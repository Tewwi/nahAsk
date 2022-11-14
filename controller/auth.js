const { User } = require("../models/user");
const hanldeError = require("../controller/handleError");
const createToken = require("../middleware/createToken");

module.exports.authController = {
  signup_post: async (req, res) => {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.userName = req.body.userName;
    user.role = req.body.role || "member";
    user.avatar = req.body.avatar;
    try {
      user = await user.save();
      res.status(200).json({ message: "create success" });
    } catch (error) {
      const err = hanldeError.hanldeError.auth(error);
      res.status(400).json({ message: "create fail", error: err });
    }
  },
  login_post: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);

      res.status(200).json({
        message: "login success",
        userInfo: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      const err = hanldeError.hanldeError.auth(error);
      res.status(400).json({ message: "login fail", error: err });
    }
  },
  change_password: async (req, res) => {
    const { email, password, newPassword, _id } = req.body;

    if(!res.currUser || res.currUser._id.toString() !== _id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await User.changePassword(email, password, newPassword);

      res.status(200).json({
        message: "change password success",
        userInfo: user,
      });
    } catch (error) {
      console.log(error);
      const err = hanldeError.hanldeError.auth(error);
      res.status(400).json({ message: "login fail", error: err });
    }
  },
  logout: (req, res) => {
    res.currUser = null;
    res.status(200).json({ message: "logout success" });
  },
};
