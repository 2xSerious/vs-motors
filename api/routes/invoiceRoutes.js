const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const router = express.Router();

router.route("/").post(invoiceController.saveInvoice);
router.route("/:id").get(invoiceController.getPdf);

module.exports = router;
