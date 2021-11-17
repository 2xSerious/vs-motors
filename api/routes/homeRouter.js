const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/home");

router
  .route("/monthly/suppliers/:from&:to")
  .get(HomeController.getDataSuppliers);
router.route("/monthly/workers").get(HomeController.getDataWorkers);

module.exports = router;
