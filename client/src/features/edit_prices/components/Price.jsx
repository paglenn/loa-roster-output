import React from "react";
import { useDispatch } from "react-redux";
import { resourceDisplayNames } from "../../../utils/reference/labels";
import { priceModifiers } from "../../../utils/reference";
import { edit_price } from "../../../state/pricesSlice";
import { update_sale } from "../salesSlice";

const Price = ({ name, value, selling }) => {
  // display name of item and price
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    const priceObj = {};
    priceObj[name] = e.target.value * priceModifiers[name];
    dispatch(edit_price(priceObj));
  };
  return (
    <div className="flex flex-row justify-between text-white my-1 justify-items-center">
      <div className="grow-0 text-xs lg:text-sm basis-2/5 justify-self-center self-center  font-bold">
        {" "}
        {resourceDisplayNames[name]}{" "}
      </div>{" "}
      <div className="flex flex-col basis-1/5">
        <p> Price: </p>
        <input
          className="text-black"
          type="text"
          value={Math.round(value / priceModifiers[name])}
          onChange={handlePriceChange}
        />
      </div>
      {/* Section to indicate whether or not you're selling the items  */}
      <div className="flex flex-col justify-self-end ">
        <p> Selling? </p>
        <input
          type="checkbox"
          checked={selling}
          onChange={(e) => {
            const saleObj = {};
            saleObj[name] = !selling;
            dispatch(update_sale(saleObj));
          }}
        />
      </div>
    </div>
  );
};

export default Price;
