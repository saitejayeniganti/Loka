const express = require("express");
const router = express.Router();
const ProductModel = require("../../model/product");
const MerchantModel = require("../../model/merchant");

router.get("/merchant", (req, res) => {
  const query = req.query.input;
  MerchantModel.aggregate([
    {
      $search: {
        index: "merchantSearch",
        autocomplete: {
          query: query,
          path: "storeName",
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        storeName: 1,
      },
    },
  ])
    .then((response) => {
      // console.log(response);
      doProductSearch(query, response, res);
      // res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

  // res.sendStatus(200);
});

const doProductSearch = (searchInput, vendors, res) => {
  ProductModel.aggregate([
    {
      $search: {
        index: "productSearch",
        autocomplete: {
          query: searchInput,
          path: "name",
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        name: 1,
      },
    },
  ])
    .then((products) => {
      // console.log(response);
      // doCombinedLocationSearch(lat, lng, products, vendors, res);
      let totalRes = [...vendors, ...products];
      res.status(200).send(totalRes);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

router.get("/storesList", (req, res) => {
  const query = req.query.input;

  res.sendStatus(200);
});

module.exports = router;
