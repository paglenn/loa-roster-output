import React, { Suspense } from "react";
import { Chart } from "react-google-charts";
import { FaSpinner } from "react-icons/fa6";
const PieChart = ({ chartData, options }) => {
  console.log("chart data is here: ", chartData);

  return (
    <Suspense fallback={<FaSpinner />}>
      <Chart
        chartType="PieChart"
        options={options}
        data={chartData}
        width={"100%"}
        height={"400px"}
      />
    </Suspense>
  );
};
export default PieChart;
