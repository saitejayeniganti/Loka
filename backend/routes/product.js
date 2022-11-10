const express = require('express');
const router = express.Router();
// const multer = require('multer');
const Mongoose = require('mongoose');

// Bring in Models & Utils
const Product = require('../model/product');
// const Brand = require('../../models/brand');
// const Category = require('../../models/category');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const checkAuth = require('../utils/auth');
// const { s3Upload } = require('../../utils/storage');
// const {
//   getStoreProductsQuery,
//   getStoreProductsWishListQuery
// } = require('../../utils/queries');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
router.post(
  '/add',
  // auth,
  // role.checkRole(role.ROLES.Admin, role.ROLES.Merchant, role.ROLES.Customer),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const taxable = req.body.taxable;
      const isActive = req.body.isActive;
      const brand = req.body.brand;
      const image = req.body.image;
      const merchant = req.body.merchant

      if (!sku) {
        return res.status(400).json({ error: 'You must enter sku.' });
      }

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      if (!quantity) {
        return res.status(400).json({ error: 'You must enter a quantity.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }

      const foundProduct = await Product.findOne({ sku });

      if (foundProduct) {
        return res.status(400).json({ error: 'This sku is already in use.' });
      }

      // const { imageUrl, imageKey } = await s3Upload(image);

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        isActive,
        brand,
        image,
        merchant
      });

      const savedProduct = await product.save();

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch products api
router.get(
  '/',
  // auth,
  // role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let products = [];
      products = await Product.find({})
      // if (req.user.merchant) {
      //   console.log("Here");
      //   const brands = await Brand.find({
      //     merchant: req.user.merchant
      //   }).populate('merchant', '_id');

      //   const brandId = brands[0]?.['_id'];

      //   products = await Product.find({})
      //     .populate({
      //       path: 'brand',
      //       populate: {
      //         path: 'merchant',
      //         model: 'Merchant'
      //       }
      //     })
      //     .where('brand', brandId);
      // } else {
      //   products = await Product.find({})//.populate({
      //   //   path: 'brand',
      //   //   populate: {
      //   //     path: 'merchant',
      //   //     model: 'Merchant'
      //   //   }
      //    //});
      //    console.log("Here In");
      // }
      res.status(200).json({
        products
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get(
  '/:id',
  // auth,
  // role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(req.params);
      let productDoc = null;

      if (req?.user?.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        productDoc = await Product.findOne({ _id: productId })
          .populate({
            path: 'brand',
            select: 'name'
          })
          .where('brand', brandId);
      } else {
        productDoc = await Product.findOne({ _id: productId })//.populate({
        //   path: 'brand',
        //   select: 'name'
        // });
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }


      res.status(200).json({
        product: productDoc
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get(
  '/merchant/:id',
  // auth,
  // role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const merchantId = req.params.id;
      console.log(req.params);

      const productsDoc = await Product.find({ merchant: merchantId }).populate({
        path: 'brand',
        select: 'name'
      });

      if (!productsDoc) {
        return res.status(404).json({
          message: 'No products found.'
        });
      }

      res.status(200).json({
        product: productsDoc
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
