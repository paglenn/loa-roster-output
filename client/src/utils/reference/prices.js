const level7GemPrice = 8000;
const destinyGuardianStoneStackPrice = 15;
const destinyDestructionStoneStackPrice = 20;
const destinyLeapstonePrice = 25;

const prices = {
  gold: 1,
  gems: level7GemPrice,
  leapstones: destinyLeapstonePrice,
  redStones: destinyDestructionStoneStackPrice,
  blueStones: destinyGuardianStoneStackPrice,
  silver: 0,
  marvelous_honor_leapstone: 30,
  greater_honor_leapstone: destinyLeapstonePrice / 625,
  obliteration_stone: destinyDestructionStoneStackPrice / 25,
  protection_stone: destinyGuardianStoneStackPrice / 25,
  crystallized_guardian_stone: 1,
  crystallized_destruction_stone: 1,
  refined_protection_stone: destinyGuardianStoneStackPrice / 5,
  refined_obliteration_stone: destinyDestructionStoneStackPrice / 5,
  radiant_honor_leapstone: destinyLeapstonePrice / 5,
  destiny_leapstone: destinyLeapstonePrice,
  destiny_destruction_stone: destinyDestructionStoneStackPrice,
  destiny_guardian_stone: destinyGuardianStoneStackPrice,
};

const priceModifiers = {
  gold: 1,
  gems: 1 / 729,
  leapstones: 1,
  redStones: 1 / 10,
  blueStones: 1 / 10,
  silver: 0,
  marvelous_honor_leapstone: 1,
  greater_honor_leapstone: 1,
  obliteration_stone: 1 / 10,
  protection_stone: 1 / 10,
  crystallized_guardian_stone: 1 / 10,
  crystallized_destruction_stone: 1 / 10,
  refined_protection_stone: 1 / 10,
  refined_obliteration_stone: 1 / 10,
  radiant_honor_leapstone: 1,
  destiny_leapstone: 1,
  destiny_destruction_stone: 1 / 10,
  destiny_guardian_stone: 1 / 10,
};

Object.keys(prices).forEach((item) => (prices[item] *= priceModifiers[item]));
if (localStorage.getItem("prices")) {
  const storedPrices = JSON.parse(localStorage.getItem("prices"));
  if (storedPrices.gems) prices.gems = storedPrices.gems;
}

/**
 * Transforms a given set of prices by applying price modifiers.
 *
 * @param {Object} prices - An object containing prices to be transformed
 * @return {Object} An object containing the transformed prices
 */
const transformPrices = (prices) => {
  return Object.keys(prices).reduce((obj, item) => {
    obj[item] = prices[item] * priceModifiers[item];
    return obj;
  }, {});
};

const updatePrices = async (region) => {
  const userRegion = region ?? "North America East";
  if (localStorage.getItem("prices"))
    return JSON.parse(localStorage.getItem("prices"));

  const newPrices = { ...prices };

  localStorage.setItem("prices", JSON.stringify(prices));
  // localStorage.setItem("prices-updated", `${Date.now()}`);
  localStorage.setItem(
    "Prices Last Updated",
    `${Date(Date.now()).toLocaleString()}`
  );
  return newPrices; // will auto-resolve into a promise
};

export { prices, updatePrices, transformPrices, priceModifiers };
