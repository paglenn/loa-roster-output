const React = require("react");
import icons from "../icons.js";

import { sumRosterOutput } from "../helpers/sums.js";
import { Resource } from "./Resource.jsx";
// should contain total roster gold income , silver, gems , leapstones, reds, blues

// stetch feature-  images!

const TotalsDisplay = (props) => {
  const {
    gold,
    silver,
    leapstones,
    gems,
    redStones,
    blueStones,
    totalGoldValue,
  } = sumRosterOutput(props.roster);

  return (
    <div className="bg-slate-300 border-black border-2">
      <h1 className="capitalize text-4xl font-extrabold">
        {" "}
        Total Weekly Output{" "}
      </h1>
      <ul className="text-3xl flex flex-row list-none list-inside justify-around">
        <li className="inline-flex">
          <img className="h-12 w-12" src={icons.gold} alt="roster gold" />
          <span> {gold.toLocaleString()} </span>
        </li>
        <li className="inline-flex">
          <img src={icons.silver} className="h-12 w-12" alt="silver" />{" "}
          {silver.toLocaleString()}
        </li>
        <li className="inline-flex">
          <img
            className="h-12 w-12"
            src={icons.marvelous_honor_leapstone}
            alt="marvelous honor leapstones"
          />{" "}
          {leapstones}
        </li>
        <li className="inline-flex">
          <img className="h-12 w-12" src={icons.gem} alt="gem" />
          {Math.round(gems)}
        </li>
        <li className="inline-flex">
          <img
            className="rounded h-12 w-12"
            src={icons.refined_obliteration_stone}
            alt="obliteration stones"
          />{" "}
          {Math.round(redStones)}
        </li>
        <li className="inline-flex">
          <img
            className="rounded h-12 w-12"
            src={icons.refined_protection_stone}
            alt="protection stones"
          />
          {Math.round(blueStones)}
        </li>
      </ul>

      <h1 className="text-3xl">
        Total <img className="inline-flex" src={icons.gold} alt="roster gold" />{" "}
        Value : {totalGoldValue.toLocaleString()}{" "}
      </h1>
    </div>
  );
};

export default TotalsDisplay;
