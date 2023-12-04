import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToggleGemSell from "../components/ToggleGemSell";
import RefreshButton from "../features/edit_prices/components/RefreshButton";
import { Region } from "../features/region_change";
import ToMain from "../components/RedirectButton";
import { useDispatch, useSelector } from "react-redux";
import { region_change } from "../features/region_change/regionSlice";
import { updatePrices } from "../utils/reference";
import { update_prices, selectPrices } from "../state/pricesSlice";
import { selectUser } from "../state/userSlice";
import { PricesContainer } from "../features/edit_prices";
import { BusContainer } from "../features/bussing";
import { ValueByTypeChart, ValueByActivity } from "../features/gold_breakdown";
import { Value } from "sass";
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
    <section className="flex flex-col justify-start">
      <section className="border-2 border-white flex flex-col lg:flex-row items-center justify-evenly text-2xl basis-1/6">
        <Region
          handleChange={(e) => {
            dispatch(region_change(e.target.value));

            updatePrices(e.target.value).then((prices) =>
              dispatch(update_prices(prices))
            );
          }}
        />
        <RefreshButton />
        <ToMain handleClick={() => navigate("/app")} label="Roster & Summary" />
      </section>

      <section className="border-red border-2 basis-1/3 flex flex-col md:flex-row justify-stretch flex-grow ">
        <ValueByTypeChart />
        <ValueByActivity />
      </section>
      {/* contain prices list and breakdown flex-row  */}
      <section className="flex flex-col lg:flex-row justify-between basis-1/2 overflow-y-scroll">
        <PricesContainer />
        <BusContainer />
      </section>
    </section>
  );
};

export default PricesPage;
