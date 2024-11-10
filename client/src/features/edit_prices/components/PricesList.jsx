// container for prices
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../../state/pricesSlice";
import { selectSales } from "../salesSlice";
import { selectUser } from "../../../state/userSlice";
import Price from "./Price";

const PricesList = ({ pricesService }) => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  const user = useSelector(selectUser);
  // turn prices into react components
  const priceComponents = Object.keys(prices)
    .map((name, index) => {
      if (name === "gold" || name === "silver") return null;
      else if (
        name === "redStones" ||
        name === "blueStones" ||
        name === "leapstones"
      )
        return null;
      return (
        <Price
          name={name}
          key={index}
          value={prices[name]}
          selling={sales[name]}
        />
      );
    })
    .filter((el) => el !== null);

  // update prices in database
  const persistPrices = async () => {
    const existingUserPrices = await pricesService.GetAll(user);
    console.log("existing: ", existingUserPrices);
    if (!existingUserPrices) pricesService.Create(user, prices);
    else pricesService.Update(user, prices);
  };

  useEffect(() => {
    persistPrices();
  }, [prices]);

  return (
    <section className="flex flex-col basis-2/5 overflow-scroll mr-1 pb-1 ">
      {" "}
      <h2 className="underline text-white text-xl text-center overflow-y-scroll">
        {" "}
        Edit Prices
      </h2>
      {priceComponents}{" "}
    </section>
  );
};
export default PricesList;
