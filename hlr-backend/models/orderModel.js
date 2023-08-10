const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Cancelled", "Completed", "Visit Confirmed"],
    default: "Pending",
  },
  visitTime: {
    type: Date
  },
}, { timestamps: true, versionKey: false });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
