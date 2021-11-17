const express = require("express");
const partsControllers = require("../controllers/parts");
const router = express.Router();

router.route("/").post(partsControllers.insertBulkParts);
router.route("/:id").delete(partsControllers.deletePart);
router.route("/add").post(partsControllers.insertPart);
router.route("/order/:id").get(partsControllers.getAllByOrderId);
router.route("/:id").put(partsControllers.updatePart);
module.exports = router;
