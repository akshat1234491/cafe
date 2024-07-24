const billsModel = require("../models/billsModel");

//add items
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.status(200).send("Bill Generated Successfully!");
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
};


//get bills data
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.status(200).send(bills);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {addBillsController,getBillsController};
