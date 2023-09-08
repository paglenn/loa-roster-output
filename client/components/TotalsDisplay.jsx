const React = require("react");
import icons from "../icons.js";

import { sumRosterOutput } from "../helpers/sums.js";
import { Resource } from "./Resource.jsx";
import {
  resourceTypes,
  hasSubtype,
  highestSubtypes,
} from "../helpers/reference";
// should contain total roster gold income , silver, gems , leapstones, reds, blues

// stetch feature-  images!

const TotalsDisplay = (props) => {
  const rosterResources = sumRosterOutput(props.roster);

  const resourceComponents = resourceTypes.map((el) => (
    <Resource
      type={hasSubtype[el] ? highestSubtypes[el] : el}
      qty={rosterResources[el]}
      imHeight={12}
      classProps="inline-flex"
    />
  ));

  return (
    <div className="bg-slate-800 border-black border-2 text-white">
      <h1 className="capitalize text-4xl font-extrabold">
        {" "}
        Total Weekly Output{" "}
      </h1>
      <ul className="text-3xl flex flex-row list-none list-inside justify-around">
        {resourceComponents}
      </ul>

      {/* Render total gold output separately in gold background */}
      <h1 className="text-3xl flex justify-center">
        <div className=" border-yellow-500 border-4 rounded px-2">
          Total{" "}
          <img
            className="inline-flex h-8 w-8"
            src={icons.gold}
            alt="roster gold"
          />{" "}
          Value : {rosterResources.totalGoldValue.toLocaleString()}{" "}
        </div>
      </h1>
    </div>
  );
};

export default TotalsDisplay;
