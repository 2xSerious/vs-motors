const express = require("express");
const workers = require("../controllers/workersController");
const router = express.Router();

router.route("/").get(workers.getAllWorker).post(workers.createNewWorker);

router
  .route("/:id")
  .get(workers.getWorkerById)
  .delete(workers.deleteWorkerById);

module.exports = router;
