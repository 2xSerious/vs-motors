const Parts = require("../models/Parts");
exports.getAllByOrderId = async (req, res, next) => {
  try {
    let id = req.params.id;
    const [parts, _] = await Parts.getAllByOrderId(id);
    res.status(200).json({ parts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.insertBulkParts = async (req, res, next) => {
  try {
    let body = req.body.parts;

    body.forEach((e) => {
      let part = new Parts(
        e.partName,
        e.partValue,
        e.partValueVat,
        e.orderId,
        e.supplierId
      );
      part.insertPart();
    });
    console.log(body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.insertPart = async (req, res, next) => {
  try {
    let { name, value, valueVat, orderId, supplierId } = req.body;
    let part = new Parts(name, value, valueVat, orderId, supplierId);
    console.log(req.body);
    part.insertPart();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePart = async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    let part = Parts.removePart(id);
    res.status(200).json({ part });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
