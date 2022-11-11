const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const Review = require('../model/review');
const Product = require('../model/product');
const Cart = require('../model/cart');
const Merchant = require('../model/merchant');
const Order = require('../model/order');

const User = require('../model/user');

//get all details
router.get('/dashboard', async (req, res) => {
  try {
    const users=await User.find({
    })
    const reviews=await Review.find({
    })
    const orders=await Order.find({
    })
    const vendors=await Merchant.find({
    })
     res.status(200).json({
        users,
        reviews,
        orders,
        vendors
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

//get all users
router.get('/users', async (req, res) => {
  try {
    const users=await User.find({
    })
    res.status(200).json(
        users
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

//get all user details, reviews and orders
router.get('/user', async (req, res) => {
  try {
    const user=await User.find({_id:req.query.id})
    const reviews=await Review.find({user:req.query.id})
    const orders=await Order.find({user:req.query.id})
    res.status(200).json({
        "user":user,
        "reviews":reviews,
        "orders":orders
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get grouped orders and all orders
router.get('/userorder', async (req, res) => {
  try {
  
    const orders=await Order.aggregate().sortByCount("user");
    const allOrders=await Order.find({
    })
    res.status(200).json({
        "orders":orders,
        "allOrders":allOrders
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get all user orders
router.get('/userorders', async (req, res) => {
  try {
    const orders=await Order.find({user:req.query.id}).populate("user")
    res.status(200).json(
        orders
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get all user reviews
router.get('/userreviews', async (req, res) => {
  try {
    const orders=await Review.find({user:req.query.id}).populate("user").populate("product")
    res.status(200).json(
        orders
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

module.exports = router;