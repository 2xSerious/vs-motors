const Vehicle = require("../models/Vehicles");

exports.createNewVehicle = async (req, res, next) => {
  try {
    let { make, model, year, reg, ownerId } = req.body;
    let vehicle = new Vehicle(make, model, year, reg, ownerId);
    await vehicle.add();
    res.status(201).json({ message: "Vehicle added!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    let [response, _] = await Vehicle.getAll();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getByCustomerId = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Vehicle.getByCustomerId(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getVehicleById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Vehicle.findById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateVehicleRecord = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { make, model, year, reg, owner } = req.body;
    let vehicle = new Vehicle(make, model, year, reg, owner);
    await vehicle.update(id);
    res.status(201).json({ message: "Record updated!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteVehicleById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Vehicle.delete(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
