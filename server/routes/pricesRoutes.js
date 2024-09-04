const express = require("express");
const router = express.Router();
const pricesController = require("../controllers/pricesController");
router.get("/", pricesController.getPrices, (req, res) => {
  console.log("res.locals.prices: ", res.locals.prices);
  res.status(200).json({ prices: res.locals.prices });
});
router.post("/", pricesController.createPrices, (req, res) => {
  res.status(200).json({ prices: res.locals.prices });
});
router.put("/", pricesController.updatePrices, (req, res) => {
  res.status(200).json({ prices: res.locals.prices });
});
module.exports = router;
