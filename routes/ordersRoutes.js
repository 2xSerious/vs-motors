const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

router
  .route("/")
  .get(ordersController.getAll, ordersController.getLastInsertId)
  .post(ordersController.addOrder);

module.exports = router;
