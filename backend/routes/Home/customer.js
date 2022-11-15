const express = require("express");
const router = express.Router();
const MerchantModel = require("../../model/merchant");

const doLocationFilter = (lng, lat, ids, res) => {
  let query = {};
  if (ids) {
    query = { _id: { $in: ids.map((each) => each._id) } };
  }
  MerchantModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, lat],
        },
        distanceField: "dist.calculated",
        maxDistance: 66000,
        includeLocs: "dist.location",
        spherical: true,
        query: query,
      },
    },
  ])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({});
    });
};

router.get("/merchants", (req, res) => {
  // console.log(req.query);
  const location = JSON.parse(req.query.location);
  const lat = location.coordinates[1];
  const lng = location.coordinates[0];
  const searchInput = req.query.searchInput;

  if (searchInput) {
    MerchantModel.aggregate([
      {
        $search: {
          index: "merchantSearch",
          autocomplete: {
            query: searchInput,
            path: "storeName",
          },
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ])
      .then((response) => {
        // console.log(response);
        doLocationFilter(lng, lat, response, res);
        // res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    doLocationFilter(lng, lat, "", res);
  }

  // res.send();
});

module.exports = router;
