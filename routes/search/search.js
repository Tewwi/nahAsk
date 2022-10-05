const express = require("express");
const router = express.Router();
const searchResult = require("../../controller/search");

router.get("/", (req, res) => {
  searchResult(req, res);
});

module.exports = router;
