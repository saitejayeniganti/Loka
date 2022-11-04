const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    // required: () => {
    //   return this.provider !== "email" ? false : true;
    // },
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  storeName: {
    type: String,
    trim: true,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    // default: null,
  },
  provider: {
    type: String,
    required: true,
    default: "email",
    trim: true,
  },
  externalId: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: Number,
    default: 0, //0: customer, 1: merchant, 2: admin
    trim: true,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  // address: { type: String, trim: true },
  // latitude: { type: Number, trim: true },
  // longitude: { type: Number, trim: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
    },
    address: { type: String, trim: true },
  },
});
const User = Mongoose.model("User", UserSchema);
User.syncIndexes();

module.exports = User;
