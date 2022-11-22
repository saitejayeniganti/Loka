const express = require('express');
const router = express.Router();
// const multer = require('multer');
const Mongoose = require('mongoose');
const Review = require('../model/review');
const Product = require('../model/product');

router.post('/add', (req, res) => {

  const review = new Review(Object.assign(req.body, { user: req.user.id}));
  review.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Your review has been added successfully and will appear when approved!`,
      review: data
    });
  });
});
// Update review by Id
router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const update = req.body;
    const query = { _id: reviewId };

    await Review.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'review has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

//Get review by productId
router.get('/:id', async (req, res) => {
  try {
    console.log("id here",req.params.id);
    const productDoc = await Product.findOne({ _id: req.params.id });

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

      if (!productDoc) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    const reviews = await Review.find({
      product: productDoc._id,
      //status: 'Approved'
    })
      .populate({
        path: 'user',
        select: 'firstName'
      })
      .sort('-created');

    res.status(200).json({
      reviews
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});
module.exports = router;