const Worker = require("../models/Workers");

exports.createNewWorker = async (req, res, next) => {
  try {
    let { wName } = req.body;
    let worker = new Worker(wName);
    await worker.add();
    res.status(201).json({ message: "Worker created!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllWorker = async (req, res, next) => {
  try {
    let [response, _] = await Worker.getAll();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getWorkerById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Worker.findById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateWorkerRecord = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { wName } = req.body;
    let worker = new Worker(wName);
    await worker.update(id);
    res.status(201).json({ message: "Record updated!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteWorkerById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Worker.delete(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
