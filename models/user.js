const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { ROLE } = require("../role");
const { imgType } = require("../utli");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 character"],
  },
  avatar: {
    type: imgType,
    default: {
      url: "https://res.cloudinary.com/dqlcjscsz/image/upload/v1665657617/avatar_aho9f1.jpg",
      publicID: "0",
    },
  },

  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLE.MEMBER,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      const { password, ...newObject } = user.toObject();
      return newObject;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = { userSchema, User };
