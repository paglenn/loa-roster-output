import React from "react";
import {
  ValueByActivity,
  ValueByItemLevel,
  ValueByTypeChart,
} from "../features/gold_breakdown";
const SummaryChartContainer = () => {
  return (
    <section>
      <h2 className="text-white text-center text-3xl">
        {" "}
        Income Summary Breakdowns
      </h2>
      <section className=" basis-2/5 flex flex-col md:flex-row justify-around ">
        <ValueByTypeChart />
        <ValueByActivity />
        <ValueByItemLevel />
      </section>
    </section>
  );
};

export default SummaryChartContainer;
