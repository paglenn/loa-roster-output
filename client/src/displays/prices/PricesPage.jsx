import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleGemSell from "./components/ToggleGemSell";
import RefreshButton from "../../features/edit_prices/components/RefreshButton";
// prices page should consist of :
// stateful prices object
// list of prices for each item
//
const PricesPage = ({ user, update }) => {
  const navigate = useNavigate();
  return <RefreshButton />;
};

export default PricesPage;
