import combineRosterResources from "../../../utils/combineRosterResources";
import { resourceDisplayNames } from "../../../utils/reference";

const goldValueByTradeable = (roster, prices, sales) => {
  const rosterResources = combineRosterResources(roster);

  // we need to separate tradable value from non-tradable value ;
  // this can easily be done by tradable vs non-tradable but we might want to actually get by material
  // here we create the array of arrays that google charts wants

  const breakdown = [["Resource", "Value"]];
  for (let item in rosterResources) {
    if (item !== "gold" && item !== "silver" && sales[item]) {
      breakdown.push([
        resourceDisplayNames[item],
        Math.round(rosterResources[item] * prices[item]),
      ]);
    }
  }

  return breakdown;
};

export default goldValueByTradeable;
