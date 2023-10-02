const level7GemPrice = 11000;
const radiantLeapstonePrice = 94;
const refineObliterationStackPrice = 45;
const refinedProtectionStackPrice = 6;
// gold value
export const prices = {
  gold: 1,
  gems: level7GemPrice / 729,
  leapstones: radiantLeapstonePrice,
  redStones: refineObliterationStackPrice / 10,
  blueStones: refinedProtectionStackPrice / 10,
  silver: 0,
  marvelous_honor_leapstone: 30,
  greater_honor_leapstone: 9,
  obliteration_stone: 7 / 10,
  protection_stone: 1 / 10,
  crystallized_guardian_stone: 1 / 10,
  crystallized_destruction_stone: 1 / 10,
  refined_protection_stone: refinedProtectionStackPrice / 10,
  refined_obliteration_stone: refineObliterationStackPrice / 10,
  radiant_honor_leapstone: radiantLeapstonePrice,
};

export const hasSubtype = {
  leapstones: true,
  redStones: true,
  blueStones: true,
};
export const resourceTypes = [
  "gold",
  "silver",
  "gems",
  "leapstones",
  "redStones",
  "blueStones",
];

export const highestSubtypes = {
  leapstones: "radiant_honor_leapstone",
  redStones: "refined_obliteration_stones",
  blueStones: "refined_protection_stones",
};

export const charPropLabels = {
  name: { label: "Name", type: "text" },
  ilvl: { label: "Item Level", type: "text" },
  isGoldEarner: { label: "Gold Earner", type: "checkbox" },
  _class: { label: "Class", type: "text" },
  restedOnly: { label: "Rested Only", type: "checkbox" },
};
