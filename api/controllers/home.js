const HomeController = require("../models/Home");

exports.getDataSuppliers = async (req, res, next) => {
  try {
    let { from, to } = req.params;
    let [response, _] = await HomeController.getDataSuppliers(from, to);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getDataWorkers = async (req, res, next) => {
  try {
    let [response, _] = await HomeController.getDataWorkers();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
