import { prices } from "../../../utils/reference";
import React, { useState, useEffect } from "react";
// checkbox
// set localStorage gem value to zero and trigger updatePrices

const ToggleGemSell = () => {
  const [sellingGems, toggleSell] = useState(true);

  const handleClick = () => {
    toggleSell(!sell);
  };

  useEffect(() => {
    const currentPrices = JSON.parse(localStorage.getItem("prices"));
    if (sellingGems) currentPrices.gems = prices.gems;
    else currentPrices.gems = 0; // not selling them
    localStorage.setItem("prices", JSON.stringify(currentPrices));
  }, [sellingGems]);

  return (
    <label>
      {" "}
      Selling Gems?{" "}
      <input
        type="checkbox"
        checked={sellingGems}
        onChange={handleClick}
      />{" "}
    </label>
  );
};
export default ToggleGemSell;
