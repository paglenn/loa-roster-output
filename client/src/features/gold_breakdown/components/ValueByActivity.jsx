import React, { useMemo } from "react";

import calcIncomeBreakdown from "../utils/overallBreakdown";
// redux imports
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../../edit_prices/salesSlice";
import { selectRoster } from "../../../state/rosterSlice";
import { selectBuses } from "../../bussing/busSlice";
import PieChart from "./PieChart";
const ValueByActivity = () => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  const roster = useSelector(selectRoster);
  const buses = useSelector(selectBuses);

  const chartData = useMemo(
    () => calcIncomeBreakdown(roster, prices, sales, buses),
    [roster, prices, sales, buses]
  );
  console.log("chart data: ", chartData);
  const options = {
    title: "Activity Income Breakdown",
    legend: { position: "none" },
    backgroundColor: { fill: "transparent" },
    titleTextStyle: { color: "#FFF" },
  };

  return (
    <div className=" text-white">
      <span> Weekly Output by Activity</span>
      <PieChart chartData={chartData} options={options} />
    </div>
  );
};

export default ValueByActivity;
