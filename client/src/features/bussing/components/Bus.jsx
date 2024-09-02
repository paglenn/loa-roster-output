import React from "react";
import { update_bus } from "../state/busSlice";
import { useDispatch } from "react-redux";

const Bus = ({ name, price, num }) => {
  const dispatch = useDispatch();
  const handleChange = (e, type) => {
    const newValue = Number(e.target.value);
    const newBusObj = {};
    newBusObj[name] = { price, num };
    newBusObj[name][type] = newValue;
    console.log("object: ", newBusObj);
    if (Number.isInteger(newValue)) dispatch(update_bus(newBusObj));
  };
  return (
    <section className="flex flex-col md:flex-row items-center">
      <div className="basis-1/4 text-xs font-bold lg:text-sm">{name} </div>

      {/* label and input field for number and price of bus */}

      <div className="flex-col basis-1/4 my-2 px-1">
        <p> Quantity: </p>
        <input
          className="text-black"
          type="text"
          value={num}
          onChange={(e) => handleChange(e, "num")}
        />
      </div>

      <div className="flex-col basis-1/4">
        <p> Price </p>
        <input
          className="text-black"
          type="text"
          value={price}
          onChange={(e) => handleChange(e, "price")}
        />
      </div>
    </section>
  );
};
export default Bus;
