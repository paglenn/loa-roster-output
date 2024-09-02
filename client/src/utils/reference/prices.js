// import axios from "axios";
const level7GemPrice = 8000;
const radiantLeapstonePrice = 55;
const refineObliterationStackPrice = 45;
const refinedProtectionStackPrice = 5;
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
if (localStorage.getItem("prices")) {
  const storedPrices = JSON.parse(localStorage.getItem("prices"));
  if (storedPrices.gems) prices.gems = storedPrices.gems;
}
const apiMap = {
  marvelous_honor_leapstone: "marvelous-honor-leapstone-3",
  greater_honor_leapstone: "great-honor-leapstone-2",
  crystallized_guardian_stone: "crystallized-guardian-stone-0",
  crystallized_destruction_stone: "crystallized-destruction-stone-0",
  obliteration_stone: "obliteration-stone-1",
  protection_stone: "protection-stone-1",
  refined_obliteration_stone: "refined-obliteration-stone-0",
  refined_protection_stone: "refined-protection-stone-0",
  radiant_honor_leapstone: "radiant-honor-leapstone-3",
  redStones: "refined-obliteration-stone-0",
  blueStones: "refined-protection-stone-0",
  leapstones: "radiant-honor-leapstone-3",
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

export { prices, updatePrices, priceModifiers };
