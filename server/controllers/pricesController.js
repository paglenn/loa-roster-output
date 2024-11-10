const Prices = require("../database/models/pricesModel");

const pricesController = {
  getPrices: async (req, res, next) => {
    const username = req.query.user;

    const prices = await Prices.findOne({ username: username });

    res.locals.prices = prices;
    return next();
  },

  updatePrices: async (req, res, next) => {
    const username = req.body.username;
    const prices = req.body.prices;
    console.log("prices: ", prices);
    await Prices.updateOne({ username: username }, { $set: prices });
    res.locals.prices = await Prices.findOne({ username: username });
    return next();
  },

  createPrices: async (req, res, next) => {
    const username = req.body.username;
    const prices = req.body.prices;
    await Prices.create({ username: username, ...prices });
    console.log("prices in req: ", prices);
    res.locals.prices = await Prices.findOne({ username: username });
    return next();
  },
};

module.exports = pricesController;
