const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Cart = require('../model/cart');
const Product = require('../model/product');
const store = require('../utils/store');

router.post('/add', auth, async (req, res) => {
  try {
    // const user = req.user._id;
    const user = "634fb3e27bcc0d0fe139ce7c";
    const items = req.body.products;

    const products = store.caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      products
    });

    const cartDoc = await cart.save();

    decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id,
      cart: cartDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});