const express = require("express");
const clientsControllers = require("../controllers/clients");
const router = express.Router();

router
  .route("/")
  .get(clientsControllers.getAllClients)
  .post(clientsControllers.createNewClient);

router
  .route("/:id")
  .get(clientsControllers.getClientById)
  .put(clientsControllers.updateCustomerRecord)
  .delete(clientsControllers.deleteCustomerById);

module.exports = router;
