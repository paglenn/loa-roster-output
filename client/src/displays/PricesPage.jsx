import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ToMain from "../components/RedirectButton";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../state/userSlice";
import { PricesContainer } from "../features/edit_prices";
import { BusContainer } from "../features/bussing";
import SummaryChartContainer from "../components/SummaryChartContainer";

// prices page should consist of :
// stateful prices object
// list of prices for each item
//
const PricesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    //protect route
    if (!user) navigate("/");
  }, [user]);

  return (
    <section className="flex flex-col justify-start overflow-scroll bg-transparent max-h-full grow">
      <section className="flex flex-col lg:flex-row items-center justify-evenly text-xl">
        <ToMain handleClick={() => navigate("/app")} label="Roster & Summary" />
      </section>

      <SummaryChartContainer />

      {/* contain prices list and breakdown flex-row  */}
      <section className="flex flex-col lg:flex-row justify-between basis-1/2 bg-transparent overflow-y-scroll ">
        <PricesContainer />
        <BusContainer />
      </section>
    </section>
  );
};

export default PricesPage;
