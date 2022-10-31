const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Cart = require('../model/cart');
const Product = require('../model/product');
const store = require('../utils/store');

router.post('/add', async (req, res) => {
  try {
    // const user = req.user._id;
    const user = "634fb3e27bcc0d0fe139ce7c";
    let items = req.body.items;
    const total = req.body.totalPrice;


    const products = store.caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      products
    });

    const cartNew = await cart.save();
    decreaseQuantity(products);
    const cart_id = cartNew._id;
    const order = new Order({
      cart: cart_id,
      user,
      total
    });

    const orderDoc = await order.save();

    // const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
    //   path: 'products.product',
    //   populate: {
    //     path: 'brand'
    //   }
    // });

    const newOrder = {
      _id: orderDoc._id,
      created: orderDoc.created,
      user: orderDoc.user,
      total: orderDoc.total,
      products: cart.products
    };
    //await mailgun.sendEmail(order.user.email, 'order-confirmation', newOrder);

    res.status(200).json({
      success: true,
      cartId: cart_id,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const decreaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};
module.exports = router;