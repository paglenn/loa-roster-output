import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import calcIncomeBreakdown from "../utils/overallBreakdown";
// redux imports
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../../edit_prices/salesSlice";
import { selectRoster } from "../../../state/rosterSlice";
import { selectBuses } from "../../bussing/busSlice";
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
    <div className="border-red border-2 text-white">
      <span> Weekly Output by Activity</span>
      <Chart
        chartType="PieChart"
        options={options}
        data={chartData}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default ValueByActivity;
