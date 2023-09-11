export const prices = {
  gold: 1,
  gems: 13.7,
  leapstones: 66,
  redStones: 3.6,
  blueStones: 0.6,
  silver: 0,
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
  isGoldEarner: { label: "Is Gold Earner", type: "checkbox" },
  _class: { label: "Class", type: "text" },
  restedOnly: { label: "Playing Rested Only", type: "checkbox" },
};