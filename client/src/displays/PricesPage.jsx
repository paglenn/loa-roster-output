import React, { useState, useEffect } from "react";
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
// prices page should consist of :
// stateful prices object
// list of prices for each item
//
const PricesPage = ({ update }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prices = useSelector(selectPrices);
  const user = useSelector(selectUser);
  useEffect(() => {
    //protect route
    if (!user) navigate("/");
  }, [user]);

  return (
    <section>
      <section className="border-2 border-white flex flex-col lg:flex-row items-center justify-evenly text-2xl">
        <Region
          handleChange={(e) => {
            dispatch(region_change(e.target.value));

            updatePrices(e.target.value).then((prices) =>
              dispatch(update_prices(prices))
            );
          }}
        />
        <RefreshButton
          handleClick={(e) =>
            update({
              type: "price_edit",
              payload: { name: e.target.id, price: e.target.value },
            })
          }
        />
        <ToMain handleClick={() => navigate("/app")} label="Roster & Summary" />
      </section>

      {/* contain prices list and breakdown flex-row  */}
    </section>
  );
};

export default PricesPage;
