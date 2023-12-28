import { prices as oldPrices, hasSubtype, convertStones } from "./reference";
import combineRosterResources from "./combineRosterResources";

const calcTotalGoldValue = (materials, prices, sales) => {
  const value = Object.keys(materials).reduce(
    (sum, name) => sum + (sales[name] ? materials[name] * prices[name] : 0),
    0
  );
  return Math.round(value);
};

const getQty = (resourceName, resource) => {
  if (hasSubtype[resourceName]) return resource.qty;
  return resource;
};

export const getResourceValue = (resourceName, resource, prices) =>
  getQty(resourceName, resource) * prices[resource.type ?? resourceName];

export const getCharValue = ({ isGoldEarner, resources }, prices, sales) => {
  // for each item in character resources add price of item * quantity
  const value = Object.keys(resources).reduce((sum, resourceName) => {
    const resource = resources[resourceName].type ?? resourceName;

    if (!sales[resource]) return sum;
    return (
      sum +
      getResourceValue(
        resourceName,
        resources[resourceName],
        prices ?? oldPrice
      )
    );
  }, 0);

  return Math.round(value);
};

export const sumRosterOutput = (characterArray, prices, sales) => {
  const rosterSum = combineRosterResources(characterArray);

  rosterSum.totalGoldValue = calcTotalGoldValue(rosterSum, prices, sales);
  return rosterSum;
};
