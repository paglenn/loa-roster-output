import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resourceDisplayNames } from "../../../utils/reference/labels";
import { priceModifiers } from "../../../utils/reference";
import { edit_price } from "../../../state/pricesSlice";
import { update_sale } from "../../../state/salesSlice";
const Price = ({ name, value, selling }) => {
  // display name of item and price
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between text-white font-bold border-2 border-slate-400">
      <div className="grow-0 text-sm basis-2/5">
        {" "}
        {resourceDisplayNames[name]}{" "}
      </div>{" "}
      <div className="flex flex-col basis-1/5">
        <p> Price: </p>
        <input
          className="text-black"
          type="text"
          value={value / priceModifiers[name]}
          onChange={(e) => {
            const priceObj = {};
            priceObj[name] = e.target.value * priceModifiers[name];
            dispatch(edit_price(priceObj));
          }}
        />
      </div>
      {/* Section to indicate whether or not you're selling the items  */}
      <div className="flex flex-col justify-self-end">
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
