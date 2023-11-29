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
// should contain total roster gold income , silver, gems , leapstones, reds, blues

// stetch feature-  images!

const TotalsDisplay = ({ roster, handleLogout, priceRedirect }) => {
  const prices =
    useSelector(selectPrices) ?? JSON.parse(localStorage.getItem("prices"));
  const user = useSelector(selectUser);
  const rosterResources = sumRosterOutput(roster, prices);

  const resourceComponents = resourceTypes.map((el, index) => (
    <Resource
      key={index}
      type={el}
      qty={rosterResources[el]}
      imHeight={8}
      classProps="basis-1/6"
    />
  ));

  return (
    <div className="bg-slate-800 text-white">
      <div className="float-right">
        {" "}
        <Logout clickHandler={handleLogout} />{" "}
      </div>

      <h2 className="capitalize text-3xl font-extrabold text-center">{user}</h2>
      <h2 className="capitalize text-3xl font-extrabold text-center">
        Total Weekly Production
      </h2>

      {/* resource components in flex container  */}
      <ul className="text-3xl flex flex-col lg:flex-row list-none list-inside justify-around">
        {resourceComponents}
      </ul>

      {/* Render total gold output separately in gold background */}
      <section>
        <h1 className="text-3xl flex justify-center font-bold">
          <div className=" border-yellow-500 border-4 rounded px-2">
            Total
            <img
              className="inline-flex h-8 w-8"
              src={icons.gold}
              alt="roster gold"
            />
            Value :{" "}
            <span className="italic">
              {" "}
              {rosterResources.totalGoldValue.toLocaleString()}{" "}
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
