const express = require("express");
const partsControllers = require("../controllers/parts");
const router = express.Router();

router.route("/").post(partsControllers.insertPart);

router.route("/order/:id").get(partsControllers.getAllByOrderId);
module.exports = router;
