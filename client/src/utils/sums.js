import { prices as oldPrices, hasSubtype, convertStones } from "./reference";
import combineRosterResources from "./combineRosterResources";

const calcTotalGoldValue = (materials, prices) => {
  const value = Object.keys(materials).reduce(
    (sum, name) => sum + materials[name] * prices[name],
    0
  );
  return Math.round(value);
};

const getQty = (resourceName, resource) => {
  if (hasSubtype[resourceName]) return resource.qty;
  return resource;
};

const getResourceValue = (resourceName, resource, prices) =>
  getQty(resourceName, resource) * prices[resource.type ?? resourceName];

export const getCharValue = ({ resources }, prices) => {
  // for each item in character resources add price of item * quantity
  const value = Object.keys(resources).reduce(
    (sum, resourceName) =>
      sum +
      getResourceValue(
        resourceName,
        resources[resourceName],
        prices ?? oldPrices
      ),
    0
  );
  return Math.round(value);
};

export const sumRosterOutput = (characterArray, prices) => {
  const rosterSum = combineRosterResources(characterArray);

  rosterSum.totalGoldValue = calcTotalGoldValue(rosterSum, prices);
  return rosterSum;
};
