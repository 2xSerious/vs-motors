const Service = require("../models/Service");

exports.createService = async (req, res, next) => {
  try {
    const { date, orderId, odometer, description, work, workerId } = req.body;
    const service = new Service({
      date,
      orderId,
      odometer,
      description,
      work,
      workerId,
    });
    await service.add();
    res.status(200).json({ service });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getServiceList = async (req, res, next) => {
  try {
    let [response, _] = await Service.getAll();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    let { id, work, paidStatus, paidId } = req.body;
    if (!paidStatus) {
      paidStatus = "0";
      paidId = "1";
    }
    console.log(req.body);
    const service = new Service({ work, paidStatus, paidId });
    await service.update(id);
    res.status(200).json({ service });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPaidTypes = async (req, res, next) => {
  try {
    let [response, _] = await Service.getPaidTypes();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    let [response, _] = await Service.getById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
