const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Merchant Schema
const MerchantSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
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
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: { type: String, trim: true },
  },
  storeName: {
    type: String,
    trim: true,
    required: true,
  },
});

// MerchantSchema.index({ location: "2dsphere" });

module.exports = Mongoose.model("Merchant", MerchantSchema);
