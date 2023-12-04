import combineRosterResources from "../../../utils/combineRosterResources";

const calcIncomeBreakdown = (roster, price, sales, buses) => {
  const rosterResources = combineRosterResources(roster);
  const breakdown = [["Source", "Value"]];
  breakdown.push(["Raids", rosterResources.gold]);

  const totalNonTradeablesGold = Object.keys(rosterResources).reduce(
    (sum, resource) => {
      if (sales[resource] && resource !== "gold")
        return sum + price[resource] * rosterResources[resource];
      else return sum;
    },
    0
  );
  breakdown.push(["Selling Tradeables", totalNonTradeablesGold]);

  const totalBussingGold = Object.keys(buses).reduce(
    (sum, bus) => sum + buses[bus].num * buses[bus].price,
    0
  );
  breakdown.push(["Buses", totalBussingGold]);

  return breakdown;
};

export default calcIncomeBreakdown;
