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
      $limit: 1,
    },
    {
      $project: {
        storeName: 1,
      },
    },
  ])
    .then((response) => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(200);
    });

  // res.sendStatus(200);
});

router.get("/storesList", (req, res) => {
  const query = req.query.input;

  res.sendStatus(200);
});

module.exports = router;
