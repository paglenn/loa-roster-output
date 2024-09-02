const React = require("react");
import icons from "../utils/assets/icons";

import { sumRosterOutput } from "../utils/sums";
import { Resource } from "./Resource";
import { resourceTypes } from "../utils/reference";
import { Logout } from "../features/auth";
import Redirect from "./RedirectButton";
import { useSelector } from "react-redux";
import { selectPrices } from "../state/pricesSlice";
import { selectUser } from "../state/userSlice";
import { selectSales } from "../features/edit_prices/salesSlice";
import { selectBuses } from "../features/bussing/state/busSlice";
import { calcBusValue } from "../features/bussing";
import { selectRoster } from "../state/rosterSlice";
// should contain total roster gold income , silver, gems , leapstones, reds, blues

// stetch feature-  images!

const TotalsDisplay = ({ priceRedirect }) => {
  const prices =
    useSelector(selectPrices) ?? JSON.parse(localStorage.getItem("prices"));
  const sales = useSelector(selectSales);
  const user = useSelector(selectUser);
  const buses = useSelector(selectBuses);
  const roster = useSelector(selectRoster);
  const rosterResources = sumRosterOutput(roster, prices, sales);

  const resourceComponents = resourceTypes.map((el, index) =>
    rosterResources[el] > 0 ? (
      <Resource
        key={index}
        type={el}
        qty={rosterResources[el]}
        imHeight={8}
        classProps="basis-1/6 shrink"
      />
    ) : null
  );

  return (
    <div className="bg-slate-800 text-white">
      <div className="float-right">
        {" "}
        <Logout />{" "}
      </div>

      <h2 className="capitalize text-3xl font-extrabold text-center">{user}</h2>
      <h2 className="capitalize text-3xl font-extrabold text-center">
        Total Weekly Production
      </h2>

      {/* resource components in flex container  */}
      <ul className="text-xl flex flex-col lg:flex-row list-none justify-between flex-wrap">
        {resourceComponents}
      </ul>

      {/* Render total gold output separately in gold background */}
      <section>
        <h1 className="text-3xl flex justify-center font-bold">
          <div className=" border-yellow-500 border-4 rounded px-2">
            Total
            <img
              className="inline-flex h-8 w-8 mx-1"
              src={icons.gold}
              alt="roster gold"
            />
            Output :{" "}
            <span className="italic">
              {" "}
              {(
                rosterResources.totalGoldValue + calcBusValue(buses)
              ).toLocaleString()}{" "}
            </span>
          </div>
        </h1>
      </section>

      <section className="flex flex-col items-center my-2">
        {" "}
        <Redirect
          handleClick={priceRedirect}
          label="Income Breakdown & Changes"
        />
      </section>
    </div>
  );
};

export default TotalsDisplay;
