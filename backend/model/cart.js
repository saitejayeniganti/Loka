const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Item Schema
const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  quantity: Number,
  purchasePrice: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  priceWithTax: {
    type: Number,
    default: 0
  },
  totalTax: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
});

module.exports = Mongoose.model('CartItem', CartItemSchema);

// Cart Schema
const CartSchema = new Schema({
  products: [CartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Cart', CartSchema);