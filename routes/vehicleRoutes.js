const express = require("express");
const vehicleController = require("../controllers/vehiclesController");
const router = express.Router();

router
  .route("/")
  .get(vehicleController.getAllVehicles)
  .post(vehicleController.createNewVehicle);

router.route("/customer/:id").get(vehicleController.getByCustomerId);
router
  .route("/:id")
  .get(vehicleController.getVehicleById)
  .put(vehicleController.updateVehicleRecord)
  .delete(vehicleController.deleteVehicleById);

module.exports = router;
