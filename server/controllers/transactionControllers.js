const transactionModel = require("../models/transactionModel");
const User = require("../models/userModel");

const createTransaction = async (req, res) => {
  const { text, amount } = req.body;

  // Fill All Details
  if (!text || !amount) {
    res.status(401);
    throw new Error("Please Fill All Details!!");
  }

  //Find User
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    res.json("User Not Found");
  }

  // Create Transaction
  const newData = await transactionModel.create({
    user: user._id,
    text,
    amount,
  });

  if (!newData) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }
  const newTransaction = {
    _id: newData.id,
    user: user._id,
    text,
    amount,
  };

  res.status(201).json(newTransaction);
};

//Get Transaction
const getTransaction = async (req, res) => {
  const { id } = req.params;
  const obj = await transactionModel.findById(id);
  res.status(200).json(obj);
  if (!getTransaction) {
    res.status(404);
    throw new Error("Transaction Not Found");
  }
};

//All Transaction
const allTransactions = async (req, res) => {
  const allData = await transactionModel.find();

  res.status(200).json(allData);
  if (!allTransactions) {
    res.status(404);
    throw new Error("Transactions Not Found");
  }
};

//Remove Transaction
const removeTransaction = async (req, res) => {
  await transactionModel.findByIdAndDelete(req.params.id);
  res.status(200).json("Transaction Deleted");
};

//Update Transaction
const updateTransaction = async (req, res) => {
  const updatedTransaction = await transactionModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTransaction);
  if (!allTransactions) {
    res.status(404);
    throw new Error("Transaction Not Found");
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  allTransactions,
  removeTransaction,
  updateTransaction,
};
