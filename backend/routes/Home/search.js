const express = require("express");
const router = express.Router();
const ProductModel = require("../../model/product");
const MerchantModel = require("../../model/merchant");

router.get("/searchMain", (req, res) => {
  const query = req.query;
  ProductModel.aggregate([
    {
      $search: {
        index: "indexName",
        autocomplete: {
          query: query,
          path: "name",
        },
      },
      $limit: 10,
      $project: { _id: 0, name: 1 },
    },
  ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(200);
    });
});

router.get("/test", (req, res) => {
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
      $limit: 1,
    },
    {
      $project: {
        storeName: 1,
      },
    },
  ])
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(200);
    });

  // res.sendStatus(200);
});

module.exports = router;
