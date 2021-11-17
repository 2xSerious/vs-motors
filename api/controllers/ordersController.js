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
exports.getAllOpen = async (req, res, next) => {
  try {
    const [orders, _] = await Order.getAllOpen();
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addOrder = async (req, res, next) => {
  try {
    const { date, vehicleId, status } = req.body;
    const order = new Order(date, vehicleId, status);
    await order.add();
    res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getLastInsertId = async (req, res, next) => {
  try {
    const response = await Order.getLastInsertId();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteOrderById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await Order.deleteOrderById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { status } = req.body;
    console.log(req.body);
    let response = await Order.updateStatus(id, status);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
