const Supplier = require("../models/Suppliers");

exports.createNewSupplier = async (req, res, next) => {
  try {
    let { sName } = req.body;
    let supplier = new Supplier(sName);
    await supplier.add();
    res.status(201).json({ message: "Supplier created!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllSupplier = async (req, res, next) => {
  try {
    let [response, _] = await Supplier.getAll();
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Supplier.findById(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateSupplierRecord = async (req, res, next) => {
  try {
    let id = req.params.id;
    let { sName } = req.body;
    let client = new Supplier(sName);
    await client.update(id);
    res.status(201).json({ message: "Record updated!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteSupplierById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let [response, _] = await Supplier.delete(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
