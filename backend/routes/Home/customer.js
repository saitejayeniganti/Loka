const express = require("express");
const router = express.Router();
const MerchantModel = require("../../model/merchant");

router.get("/merchants", (req, res) => {
  console.log(req.query);
  const location = JSON.parse(req.query.location);
  const lat = location.coordinates[1];
  const lng = location.coordinates[0];
  MerchantModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, lat],
        },
        distanceField: "dist.calculated",
        maxDistance: 10000,
        includeLocs: "dist.location",
        spherical: true,
      },
    },
  ])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({});
    });
  // res.send();
});

module.exports = router;
