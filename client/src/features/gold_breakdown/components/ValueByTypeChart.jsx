import React, { useMemo, Suspense, useEffect } from "react";
import PieChart from "./PieChart";
import goldValueByTradeable from "../utils/goldValueByTradeable";
// redux imports
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../../edit_prices/salesSlice";
import { selectRoster } from "../../../state/rosterSlice";
const ValueByTypeChart = () => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  const roster = useSelector(selectRoster);

  const chartData = useMemo(
    () => goldValueByTradeable(roster, prices, sales),
    [roster, prices, sales]
  );
  console.log("chart data: ", chartData);
  const options = {
    title: "Tradables Income Breakdown",
    legend: { position: "none" },
    backgroundColor: { fill: "transparent" },
    titleTextStyle: { color: "#FFF" },
  };

  return (
    <div className=" text-white ">
      <span>Tradeable Weekly Output Value </span>
      <PieChart chartData={chartData} options={options} />
    </div>
  );
};

export default ValueByTypeChart;
