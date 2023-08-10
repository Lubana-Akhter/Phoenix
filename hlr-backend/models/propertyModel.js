const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Consider using an array of image URLs
    location: {
      address: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipcode: { type: String, required: false },
      country: { type: String, required: false },
    },
    type: { type: String, enum: ["Rent", "Sell", "Both"], required: true },
    status: {
      type: String,
      enum: ["Rented", "Sold", "Available"],
      default: "Available",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    storeys: { type: Number },
    land_area: { type: Number },
    basement: { type: String },
    parking: { type: String },
    floor: { type: Number },
    unit: { type: Number },
    sales: { type: String },
    price: { type: Number },
    baths: { type: Number },
    beds: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
