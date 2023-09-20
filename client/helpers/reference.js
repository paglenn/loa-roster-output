export const prices = {
  gold: 1,
  gems: 13.717,
  leapstones: 81,
  redStones: 40 / 10,
  blueStones: 6 / 10,
  silver: 0,
  marvelous_honor_leapstone: 20,
  greater_honor_leapstone: 5,
  obliteration_stone: 7 / 10,
  protection_stone: 1 / 10,
  crystallized_guardian_stone: 1 / 10,
  crystallized_destruction_stone: 2 / 10,
  refined_protection_stone: 6 / 10,
  refined_obliteration_stone: 40 / 10,
  radiant_honor_leapstone: 81,
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
