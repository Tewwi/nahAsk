const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirName = process.env.DEV ? "./uploads" : "/tmp/";
    console.log(dirName);
    cb(null, dirName);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
