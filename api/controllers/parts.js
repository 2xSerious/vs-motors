const Parts = require("../models/Parts");
exports.getAll = async (req, res, next) => {
  try {
    const [parts, _] = await Parts.getAll();
    res.status(200).json({ parts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
