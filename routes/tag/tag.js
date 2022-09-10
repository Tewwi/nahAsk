const express = require("express");
const router = express.Router();
const { tagController } = require("../../controller/tags");

router.get("/", tagController.showAll);
router.post("/newTag", tagController.add);
router.delete("/:id", tagController.delete);

module.exports = router;
