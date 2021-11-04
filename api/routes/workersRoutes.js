const express = require("express");
const workers = require("../controllers/workersController");
const { route } = require("./serviceRoutes");
const router = express.Router();

router.route("/").get(workers.getAllWorker).post(workers.createNewWorker);
router.route("/:name").get(workers.checkDuplicate);
router
  .route("/worker/:id")
  .get(workers.getWorkerById)
  .delete(workers.deleteWorkerById);

module.exports = router;
