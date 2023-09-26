const React = require("react");
import icons from "../helpers/icons";

import { sumRosterOutput } from "../helpers/sums.js";
import { Resource } from "./Resource.jsx";
import {
  resourceTypes,
  hasSubtype,
  highestSubtypes,
} from "../helpers/reference";
// should contain total roster gold income , silver, gems , leapstones, reds, blues

// stetch feature-  images!

const TotalsDisplay = ({ user, roster }) => {
  const rosterResources = sumRosterOutput(roster);

  const resourceComponents = resourceTypes.map((el, index) => (
    <Resource
      key={index}
      type={hasSubtype[el] ? highestSubtypes[el] : el}
      qty={rosterResources[el]}
      imHeight={8}
      classProps="inline-flex"
    />
  ));

  return (
    <div className="bg-slate-800 border-black border-2 text-white">
      <h1 className="capitalize text-4xl font-extrabold text-center">
        Total Weekly Output
      </h1>
      <h2 className="capitalize text-3xl font-extrabold text-center">
        {" "}
        {user ? user : "TestUser"}{" "}
      </h2>
      <ul className="text-3xl flex flex-row list-none list-inside justify-around">
        {resourceComponents}
      </ul>

      {/* Render total gold output separately in gold background */}
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
    </div>
  );
};

export default TotalsDisplay;
