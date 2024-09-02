import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBuses } from "../state/busSlice";
import Bus from "./Bus";
const BusList = () => {
  const buses = useSelector(selectBuses);
  const busComponents = Object.keys(buses).map((name, index) => {
    return (
      <Bus
        name={name}
        key={index}
        num={buses[name].num}
        price={buses[name].price}
      />
    );
  });

  return (
    <section className="flex flex-col overflow-scroll text-white justify-between basis-1/2 pb-1">
      <h2 className="underline text-center text-xl"> Buses </h2>
      {busComponents}
    </section>
  );
};

export default BusList;
