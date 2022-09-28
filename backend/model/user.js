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
  },
  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    default: null,
  },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  externalId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "ROLE_ADMIN",
    enum: ["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MERCHANT"],
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  location: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

module.exports = Mongoose.model("User", UserSchema);
