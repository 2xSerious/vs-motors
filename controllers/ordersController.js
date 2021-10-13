const Order = require("../models/Orders");

exports.getAll = async (req, res, next) => {
  try {
    const [orders, _] = await Order.getAll();
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const { date, vehicleId } = req.body;
    const order = new Order(date, vehicleId);
    await order.add();
    res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getLastInsertId = async (req, res, next) => {
  try {
    const res = await Order.getLastInsertId();
    res.status(200).json({ res });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
