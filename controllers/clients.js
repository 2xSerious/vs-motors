const Clients = require("../models/Clients");

exports.createNewClient = async (req, res, next) => {
  try {
    let { cName, phone, email } = req.body;
    let client = new Clients(cName, phone, email);
    await client.add();
    res.status(201).json({ message: "Client created!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllClients = async (req, res, next) => {
  try {
    let [response, _] = await Clients.getAll();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getClientById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Clients.findById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCustomerRecord = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { cName, phone, email } = req.body;
    let client = new Clients(cName, phone, email);
    await client.update(id);
    res.status(201).json({ message: "Record updated!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCustomerById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Clients.delete(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
