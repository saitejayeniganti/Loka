const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Product = require('../model/product');
const store = require('../utils/store');
const auth = require('../middleware/auth');
const { sendMail } = require("../utils/mail");

router.post('/add', async (req, res) => {
  try {
    // const user = req.user._id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    const user = "637446b8c4c910caff00e6bc";
    let items = req.body.items;
    const total = req.body.totalPrice;


    const products = store.caculateItemsSalesTax(items);

    // const cart = new Cart({
    //   user,
    //   products
    // });

    // const cartNew = await cart.save();
    decreaseQuantity(products);
    // const cart_id = cartNew._id;
    const order = new Order({
      //cart: cart_id,
      products,
      user,
      total
    });
    console.log(order);

    const orderDoc = await order.save();

    // const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
    //   path: 'products.product',
    //   populate: {
    //     path: 'brand'
    //   }
    // });

    // const newOrder = {
    //   _id: orderDoc._id,
    //   created: orderDoc.created,
    //   user: orderDoc.user,
    //   total: orderDoc.total,
    //   products: cart.products
    // };
    sendMail({
      to: "poonam273713@gmail.com",
      subject: 'Order confirmation',
      text: `Hi Poonam! Thank you for your order!. \n\n` +
        `We've received your order and will contact you as soon as your package is shipped. \n\n`
    });

    res.status(200).json({
      success: true,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});
// fetch my orders api
router.get('/me', async (req, res) => {
  try {
    console.log("me ", req);
    const { page = 1, limit = 10 } = req.query;
    // const user = req.user._id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    const user = "637446b8c4c910caff00e6bc";
    const query = { user };
    console.log("query", query);

    const ordersDoc = await Order.find(query)
      .sort('-created')
      // .populate({
      //   path: 'cart',
      //   populate: {
      //     path: 'products.product',
      //     populate: {
      //       path: 'brand'
      //     }
      //   }
      // })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Order.countDocuments(query);
    console.log("count ", count);
    const orders = store.formatOrders(ordersDoc);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    console.log("X ", error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order id 
router.get('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    let orderDoc = null;

    // if (req.user?.role === role.ROLES.Admin) {
    //   orderDoc = await Order.findOne({ _id: orderId }).populate({
    //     path: 'cart',
    //     populate: {
    //       path: 'products.product',
    //       // populate: {
    //       //   path: 'brand'
    //       // }
    //     }
    //   });
    // } else {
    // const user = req.user._id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    const user = "637446b8c4c910caff00e6bc";
    orderDoc = await Order.findOne({ _id: orderId, user })
    // .populate({
    //   populate: {
    //     path: 'products.product',
    //     populate: {
    //       path: 'brand'
    //     }
    //   }
    // });
    //}

    if (!orderDoc) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }
    let order = {
      _id: orderDoc._id,
      total: orderDoc.total,
      created: orderDoc.created,
      totalTax: 0,
      products: orderDoc?.products,
      // cartId: orderDoc.cart._id
    };

    order = store.caculateTaxAmount(order);

    res.status(200).json({
      order
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch my orders api
router.get('/me', async (req, res) => {
  try {
    console.log("me ", req);
    const { page = 1, limit = 10 } = req.query;
    // const user = req.user._id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    const user = "637446b8c4c910caff00e6bc";
    const query = { user };
    console.log("query", query);

    const ordersDoc = await Order.find(query)
      .sort('-created')
      // .populate({
      //   path: 'cart',
      //   populate: {
      //     path: 'products.product',
      //     populate: {
      //       path: 'brand'
      //     }
      //   }
      // })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Order.countDocuments(query);
    console.log("count ", count);
    const orders = store.formatOrders(ordersDoc);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    console.log("X ", error);
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