const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Merchant Schema
const MerchantSchema = new Schema({
  storeName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  business: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Waiting Approval",
    enum: ["Waiting Approval", "Rejected", "Approved"],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Merchant", MerchantSchema);
