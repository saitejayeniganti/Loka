const express = require("express");
const router = express.Router();

router.get("/merchants", (req, res) => {
  const params = req.query;
  console.log(params);
  res.send();
});

module.exports = router;
