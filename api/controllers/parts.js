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

exports.insertPart = async (req, res, next) => {
  try {
    let body = req.body.parts;

    body.forEach((e) => {
      let part = new Parts(e.partName, e.partValue, e.partValueVat, e.orderId);
      part.insertPart();
    });
    console.log(body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
