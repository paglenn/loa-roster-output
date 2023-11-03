import { useState } from "react";
import { prices, updatePrices } from "../../../utils/reference";
// initial value - default prices from reference
// updater - either get value from updatePrices(region) or update to specific price in string
const usePrices = () => {
  const [priceState, updatePriceState] = useState(prices);
  // update prices initially based on api
  updatePrices().then((apiPrices) => updatePriceState(apiPrices));

  // returned updater should:
  // allow update based on region or prices object
  const priceUpdater = ({ type, payload }) => {
    if (type === "change_region") {
      // payload is a string containing the region
      const region = payload.region;
      updatePrices(region).then((apiPrices) => updatePriceState(apiPrices));
    } else if (type === "edit_price") {
      updatePriceState(payload.prices);
      localStorage.setItem("prices", payload.prices);
    }
  };

  return [priceState, priceUpdater];
};
