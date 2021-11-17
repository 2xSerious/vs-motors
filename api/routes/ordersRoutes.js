const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

router
  .route("/")
  .get(ordersController.getAll, ordersController.getLastInsertId)
  .post(ordersController.addOrder);

router.route("/open").get(ordersController.getAllOpen);

router
  .route("/:id")
  .delete(ordersController.deleteOrderById)
  .put(ordersController.updateStatus);
module.exports = router;
