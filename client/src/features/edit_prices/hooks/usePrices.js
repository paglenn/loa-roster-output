import { useState } from "react";
import { prices, updatePrices } from "../../../utils/reference";
// initial value - default prices from reference
// updater - either get value from updatePrices(region) or update to specific price in string
const usePrices = () => {
  const [priceState, updatePriceState] = useState(prices);
  // update prices initially based on api
  const region = localStorage.getItem("region") ?? "North America East";
  updatePrices(region).then((apiPrices) => updatePriceState(apiPrices));

  // returned updater should:
  // allow update based on region or prices object
  const priceUpdater = ({ type, payload }) => {
    if (type === "region_change") {
      // payload is a string containing the region
      localStorage.setItem("region", payload);
      updatePrices(payload).then((apiPrices) => updatePriceState(apiPrices));
    } else if (type === "price_edit") {
      // payload contains {item name: price }
      updatePriceState({ ...priceState, payload });
      localStorage.setItem("prices", payload);
    }
  };

  return [priceState, priceUpdater];
};

export default usePrices;
