const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transactionDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Canceled"],
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
