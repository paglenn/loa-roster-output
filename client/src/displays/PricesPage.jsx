import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleGemSell from "../components/ToggleGemSell";
import RefreshButton from "../features/edit_prices/components/RefreshButton";
import { Region } from "../features/region_change";
import ToMain from "../components/RedirectButton";
// prices page should consist of :
// stateful prices object
// list of prices for each item
//
const PricesPage = ({ user, prices, update }) => {
  const navigate = useNavigate();
  const [region, setRegion] = useState(
    localStorage.getItem("region") ?? "North America East"
  );
  return (
    <section>
      <section className="border-2 border-white flex flex-col lg:flex-row items-center justify-evenly text-2xl">
        <Region
          handleChange={(e) => {
            setRegion(e.target.value);
            update({ type: "region_change", payload: e.target.value });
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
