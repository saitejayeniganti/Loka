const express = require("express");
const router = express.Router();
const ProductModel = require("../../model/product");

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
  //   const quer = req.params.query;
  res.sendStatus(200);
});

module.exports = router;
