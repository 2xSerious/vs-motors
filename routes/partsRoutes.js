const express = require("express");
const partsControllers = require("../controllers/parts");
const router = express.Router();

router.route("/").get(partsControllers.getAll);

module.exports = router;
