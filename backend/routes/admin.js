const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const Review = require('../model/review');
const Product = require('../model/product');
const Cart = require('../model/cart');
const Merchant = require('../model/merchant');
const Order = require('../model/order');
const AdRequest = require('../model/adRequest');
const AdClicks = require('../model/adClicks');
const User = require('../model/user');
const { findByIdAndUpdate } = require('../model/review');

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
    const reviews=await Review.find({user:req.query.id}).populate("user").populate("product")
    res.status(200).json(
        reviews
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get all vendors
router.get('/vendors', async (req, res) => {
  try {
    const vendor=await Merchant.find({})
    res.status(200).json(
        vendor
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get grouped orders and all orders
router.get('/vendororder', async (req, res) => {
  try {
  const orders=await Order.aggregate().sortByCount("merchant");
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

//get all vendor orders
router.get('/vendororders', async (req, res) => {
  try {
    const orders=await Order.find({merchant:req.query.id}).populate("merchant").populate("user")
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


//get all orders
router.get('/allorders', async (req, res) => {
  try {
    const orders=await Order.find({}).sort({"created":-1}).populate("user")
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


//get all vendor reviews
router.get('/vendorreviews', async (req, res) => {
  try {
    const reviews=await Review.find({merchant:req.query.id}).populate("merchant")
    res.status(200).json(
        reviews
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})


//get all vendor details, reviews and orders
router.get('/vendor', async (req, res) => {
  try {
    const vendor=await Merchant.find({_id:req.query.id})
    // const reviews=await Review.find({user:req.query.id})
    const orders=await Order.find({merchant:req.query.id})
    res.status(200).json({
        "vendor":vendor,
        // "reviews":reviews,
        "orders":orders
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

//get all merchants
router.get('/allmerchants', async (req, res) => {
  try {
    const vendor=await Merchant.find({})
    
    res.status(200).json({
        vendor}
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})


router.post('/adrequest', async (req, res) => {
  try {
      console.log(req.body)
      const adrequest = new AdRequest(req.body)
      console.log(adrequest);
      const adrequestDoc = await adrequest.save();
       res.status(200).json({adrequest});
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

  router.put('/adstatus', async (req, res) => {
  try {
      const filter = { _id: req.body.id };
      const update = {isApproved:req.body.isApproved,status:req.body.status};
      const adrequestDoc = await AdRequest.findByIdAndUpdate(filter, update)
       res.status(200).json(adrequestDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

    router.put('/adpaid', async (req, res) => {
      console.log(req.body)
  try {
      const filter = { _id: req.body.id };
      const update = {"isPaid":"PAID","status":"PAID"};
      const adrequestDoc = await AdRequest.findByIdAndUpdate(filter, update)
       res.status(200).json(adrequestDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

  //save ads in marchant
    router.put('/savemerchantads', async (req, res) => {
      console.log(req.body)
  try {
      const filter = { _id: req.body.id };
      const update = {"ads":req.body.ads};
      const merchantDoc = await Merchant.findByIdAndUpdate(filter, update)
       res.status(200).json(merchantDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

   router.put('/adclick', async (req, res) => {
      // console.log("click api server",req.body)
  try {
      const filter = { _id: req.body.id };
      const ad = await AdRequest.find({_id: req.body.id})
      let clicks= parseInt(ad[0].clicks) +1
      const update = {"clicks":clicks};
      const adrequestDoc = await AdRequest.findByIdAndUpdate(filter, update)

      // const filter1={adRequestId: req.body.id,userId:req.body.userId}
      // const adClick = await AdRequest.find(filter1)
      // if(
      //   console.log("adclick schema data",adClick)
      // )
      // const adClickDoc = await AdClicks.findByIdAndUpdate(filter, update)

      res.status(200).json(adrequestDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

  router.get('/addetails', async (req, res) => {
  try {
      const addetails = await AdRequest.find({email:req.query.id}).populate("merchantId")
      res.status(200).json(addetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})


  router.get('/alladdetails', async (req, res) => {
  try {
      const addetails = await AdRequest.find().populate("merchantId")
      res.status(200).json(addetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})

  //get ads from merchant
  router.get('/merchant', async (req, res) => {
  try {
      console.log(req.query)
      const merchant = await Merchant.find({_id:req.query.id})
      res.status(200).json(merchant[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})


  router.get('/adimages', async (req, res) => {
  try {
      console.log(req.query)
      const adimages = await AdRequest.find({merchantId:req.query.id}).populate("merchantId")
      for(var ad of adimages)
      {
        var sd=new Date(ad.fromDate)
        var ed=new Date(ad.toDate)
        var clientDate=new Date(req.query.date)
        if(sd<clientDate && clientDate<ed)
          return res.status(200).json(ad);
      }
      res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }})


module.exports = router;