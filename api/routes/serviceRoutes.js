const express = require("express");
const service = require("../controllers/serviceController");
const router = express.Router();

router
  .route("/")
  .get(service.getServiceList)
  .post(service.createService)
  .put(service.updateService);

router.route("/current").get(service.getAllCurrent);
router
  .route("/service/:id")
  .get(service.getServiceById)
  .put(service.updatePaidStatus);
router.route("/types").get(service.getPaidTypes);
module.exports = router;
