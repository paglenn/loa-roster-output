import axios from "axios";
const level7GemPrice = 10500;
const radiantLeapstonePrice = 100;
const refineObliterationStackPrice = 45;
const refinedProtectionStackPrice = 6;
const prices = {
  gold: 1,
  gems: level7GemPrice,
  leapstones: radiantLeapstonePrice,
  redStones: refineObliterationStackPrice,
  blueStones: refinedProtectionStackPrice,
  silver: 0,
  marvelous_honor_leapstone: 30,
  greater_honor_leapstone: 9,
  obliteration_stone: 7,
  protection_stone: 1,
  crystallized_guardian_stone: 1,
  crystallized_destruction_stone: 1,
  refined_protection_stone: refinedProtectionStackPrice,
  refined_obliteration_stone: refineObliterationStackPrice,
  radiant_honor_leapstone: radiantLeapstonePrice,
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
};

Object.keys(prices).forEach((item) => (prices[item] *= priceModifiers[item]));
const apiMap = {
  marvelous_honor_leapstone: "marvelous-honor-leapstone-3",
  greater_honor_leapstone: "great-honor-leapstone-2",
  crystallized_guardian_stone: "crystallized-destruction-stone-0",
  obliteration_stone: "obliteration-stone-1",
  protection_stone: "protection-stone-1",
  refined_obliteration_stone: "refined-obliteration-stone-0",
  refined_protection_stone: "refined-protection-stone-0",
  radiant_honor_leapstone: "radiant-honor-leapstone-3",
  redStones: "refined-obliteration-stone-0",
  blueStones: "refined-protection-stone-0",
  leapstones: "radiant-honor-leapstone-3",
};

const updatePrices = async () => {
  // if we already have prices stored, no need to retrieve
  // update once every 6 hours
  if (localStorage.getItem("prices")) {
    const currentTime = Date.now();
    const updatedTime = localStorage.getItem("prices-updated");
    if (currentTime - updatedTime < 1000 * 60 * 60 * 6)
      return JSON.parse(localStorage.getItem("prices"));
  }

  const apiPrices = await axios
    .get(
      "https://www.lostarkmarket.online/api/export-market-live/North America East?category=Enhancement Material&subcategory=Honing Materials&tier=Tier 3"
    )
    .then((response) => response.data);
  const apiPriceObj = {};
  apiPrices.forEach((item) => {
    apiPriceObj[item.id] = item.recentPrice;
  });

  Object.keys(prices).forEach((item) => {
    if (apiMap[item] in apiPriceObj) {
      const unitPrice = apiPriceObj[apiMap[item]] * priceModifiers[item];
      prices[item] = unitPrice;
    }
  });
  // store in local storage
  localStorage.setItem("prices", JSON.stringify(prices));
  localStorage.setItem("prices-updated", `${Date.now()}`);
  return prices; // will auto-resolve into a promise
};

export { prices, updatePrices };
