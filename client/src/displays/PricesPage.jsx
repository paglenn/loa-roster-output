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
const PricesPage = ({ user, update }) => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col lg:flex-row items-center">
      <Region />
      <RefreshButton />
      <ToMain handleClick={() => navigate("/app")} label="Roster & Summary" />
    </section>
  );
};

export default PricesPage;
