import React, { useMemo } from "react";

import getGoldValueByIlvl from "../utils/itemLevelBreakdown";
// redux imports
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../../edit_prices/salesSlice";
import { selectRoster } from "../../../state/rosterSlice";

import PieChart from "./PieChart";
const ValueByItemLevel = () => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  const roster = useSelector(selectRoster);

  const chartData = useMemo(
    () => getGoldValueByIlvl(roster, prices, sales),
    [roster, prices, sales]
  );
  console.log("chart data: ", chartData);
  const options = {
    title: "Item Level Income Breakdown",
    legend: { position: "none" },
    backgroundColor: { fill: "transparent" },
    titleTextStyle: { color: "#FFF" },
  };

  return (
    <div className=" text-white">
      <span> Weekly Output by Item Level</span>
      <PieChart chartData={chartData} options={options} />
    </div>
  );
};

export default ValueByItemLevel;
