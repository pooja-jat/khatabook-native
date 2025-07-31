const express = require("express");
const {
  createTransaction,
  getTransaction,
  allTransactions,
  removeTransaction,
  updateTransaction,
} = require("../controllers/transactionControllers");

const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/transaction", authMiddleware, createTransaction);
router.get("/transactions", allTransactions);
router.get("/transaction/:id", getTransaction);
router.delete("/transaction/:id", removeTransaction);
router.put("/transaction/:id", updateTransaction);
module.exports = router;
