import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowsRotate } from "react-icons/fa6";
import { update_prices } from "../../../state/pricesSlice";
import { updatePrices } from "../../../utils/reference";
import { selectRegion } from "../../region_change/regionSlice";

const RefreshButton = () => {
  const region = useSelector(selectRegion);
  const dispatch = useDispatch();
  const handleClick = () => {
    updatePrices(region).then((prices) => dispatch(update_prices(prices)));
  };

  return (
    <button
      onClick={handleClick}
      className="bg-cyan-600 flex flex-row rounded items-center p-1 justify-between"
    >
      {" "}
      <div className="mr-2"> Refresh Prices</div>
      <div>
        <FaArrowsRotate />{" "}
      </div>
    </button>
  );
};

export default RefreshButton;
