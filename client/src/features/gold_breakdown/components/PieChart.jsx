import React, { Suspense } from "react";
import { Chart } from "react-google-charts";
import { FaSpinner } from "react-icons/fa6";

/**
 * A React component that renders a pie chart with the provided data and options.
 *
 * @param {object} chartData - The data to be displayed in the pie chart.
 * @param {object} options - The options for customizing the appearance of the pie chart.
 * @return {JSX.Element} A JSX element representing the pie chart.
 */
const PieChart = ({ chartData, options }) => {
  return (
    <Suspense fallback={<FaSpinner />}>
      <Chart
        chartType="PieChart"
        options={options}
        data={chartData}
        width={"100%"}
        height={"500px"}
      />
    </Suspense>
  );
};
export default PieChart;
