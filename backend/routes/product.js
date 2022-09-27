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
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant, role.ROLES.Customer),
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
module.exports = router;
