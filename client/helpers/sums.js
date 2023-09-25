import { prices, hasSubtype } from "./reference";
import { stoneConvert } from "./conversion";

const calcTotalGoldValue = (materials) => {
  const value = Object.keys(materials).reduce(
    (sum, name) => sum + materials[name] * prices[name],
    0
  );
  return Math.round(value);
};
// const getResourceType = (resourceName, resource) => {
//   if (hasSubtype[resourceName]) return resource.type;
//   return resource;
// };
const getQty = (resourceName, resource) => {
  if (hasSubtype[resourceName]) return resource.qty;
  return resource;
};

const getResourceValue = (resourceName, resource) =>
  getQty(resourceName, resource) * prices[resource.type ?? resourceName];

export const getCharValue = ({ resources }) => {
  // for each item in character resources add price of item * quantity
  const value = Object.keys(resources).reduce(
    (sum, resourceName) =>
      sum + getResourceValue(resourceName, resources[resourceName]),
    0
  );
  return Math.round(value);
};
export const sumRosterOutput = (characterArray) => {
  const sumObj = {};

  sumObj.gold = characterArray.reduce(
    (sum, char) => sum + char.resources.gold,
    0
  );
  sumObj.silver = characterArray.reduce(
    (sum, char) => sum + char.resources.silver,
    0
  );
  sumObj.leapstones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(
        char.resources.leapstones.type,
        char.resources.leapstones.qty
      ),
    0
  );
  sumObj.leapstones = Math.round(sumObj.leapstones);

  sumObj.gems = characterArray.reduce(
    (sum, char) => sum + char.resources.gems,
    0
  );
  sumObj.gems = Math.round(sumObj.gems);
  sumObj.redStones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(char.resources.redStones.type, char.resources.redStones.qty),

    0
  );
  sumObj.redStones = Math.round(sumObj.redStones);
  sumObj.blueStones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(
        char.resources.blueStones.type,
        char.resources.blueStones.qty
      ),
    0
  );
  sumObj.blueStones = Math.round(sumObj.blueStones);

  sumObj.totalGoldValue = calcTotalGoldValue(sumObj);
  return sumObj;
};
