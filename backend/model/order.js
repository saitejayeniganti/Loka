const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Cart Item Schema
const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: Number,
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
  },
  taxable: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
  },
  numReviews: {
    type: Number,
    require: true,
    default: 0,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  purchasePrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  priceWithTax: {
    type: Number,
    default: 0,
  },
  totalTax: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Not processed",
    enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
});

module.exports = Mongoose.model("OrderItem", OrderItemSchema);
// Order Schema
const OrderSchema = new Schema({
  // cart: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Cart'
  // },
  products: [OrderItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    default: 0,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Order", OrderSchema);
