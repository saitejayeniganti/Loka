const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Product = require('../model/product');
const Mongoose = require('mongoose');
const store = require('../utils/store');
const ObjectId = Mongoose.Types.ObjectId;
const auth = require('../middleware/auth');
const { sendMail } = require("../utils/mail");

router.post('/add', async (req, res) => {
  try {
     const user = req.user.id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    // const user = "637446b8c4c910caff00e6bc";
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
      to: req.user.email,
      subject: 'Order confirmation',
      text: `Hi ${req.user.firstName}! Thank you for your order!. \n\n` +
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
    // console.log("me ", req);
    console.log("req.user", req.user);
    const { page = 1, limit = 10 } = req.query;
     const user = req.user.id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    // const user = "637446b8c4c910caff00e6bc";
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
     const user = req.user.id;
    // const user = "634fb3e27bcc0d0fe139ce7c";
    // const user = "637446b8c4c910caff00e6bc";
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

router.get('/merchant/myOrder/:id', async (req, res) => {
  try {
    const merchantId = req.params.id;

    const ordersDoc = await Order.
      aggregate([
        {
          $unwind: "$products"
        },
        {
          $match: {
            "products.merchant": ObjectId(merchantId)

          }
        },
        {
          $group: {
            _id: "$_id",
            created: { $max: "$created" },
            user: { $max: "$user" },
            total: { $max: "$total" },
            products: {
              $push: "$products"
            }
          }
        },
        {
          $sort: { "created": 1 }
        }
      ]);
    const orders = ordersDoc;

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log("X ", error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/merchant/myOrder/update', async (req, res) => {
  try {
    const { productId, status } = req.body;
    console.log("idxx ", productId);

    const ordersDoc = await Order
      .updateOne({ "products._id": ObjectId(productId) },
        { $set: { "products.$.status": status } })
    const orders = ordersDoc

    res.status(200).json({
      orders,
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