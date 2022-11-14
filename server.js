const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blog/blogs");
const searchRoutes = require("./routes/search/search");
const authRoutes = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/user/user");
const tagRoutes = require("./routes/tag/tag");
const commentRoutes = require("./routes/comment/comment");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require(`path`);
const { checkCurrUser } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://tewwi:${process.env.PASSWORD}@cluster0.rkqbjnv.mongodb.net/Blog?retryWrites=true&w=majority`
);

app.use("/uploads", express.static(path.join(__dirname, `uploads`)));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("*", checkCurrUser);

app.use(authRoutes);

app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);
app.use("/tag", tagRoutes);
app.use("/user", userRoutes);
app.use("/search", searchRoutes);

app.listen(port);
console.log("listen");

module.exports = app;
