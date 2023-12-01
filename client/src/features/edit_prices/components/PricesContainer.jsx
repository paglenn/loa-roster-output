// container for prices
import React from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../../../state/salesSlice";
import Price from "./Price";
const PricesContainer = () => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  // turn prices into react components
  const priceComponents = Object.keys(prices)
    .map((name) => {
      if (name === "gold" || name === "silver") return null;
      else if (
        name === "redStones" ||
        name === "blueStones" ||
        name === "leapstones"
      )
        return null;
      return <Price name={name} value={prices[name]} selling={sales[name]} />;
    })
    .filter((el) => el !== null);
  console.log("prices", prices);
  console.log(priceComponents);
  return <section className="flex flex-col"> {priceComponents} </section>;
};
export default PricesContainer;
