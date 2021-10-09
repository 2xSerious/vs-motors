const express = require("express");
const suppliers = require("../controllers/supplierController");
const router = express.Router();

router
  .route("/")
  .get(suppliers.getAllSupplier)
  .post(suppliers.createNewSupplier);

router
  .route("/:id")
  .get(suppliers.getSupplierById)
  .put(suppliers.updateSupplierRecord)
  .delete(suppliers.deleteSupplierById);

module.exports = router;
