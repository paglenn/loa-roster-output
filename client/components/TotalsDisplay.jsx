const React = require("react");
import icons from "../icons.js";
import styles from "../styles/totalsdisplay.module.css";
import { stoneConvert, calcValue } from "../helpers.js";
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
  } = sumCharacterOutput(props.roster);

  return (
    <div className="bg-slate-300 border-black border-2">
      <h1 className="capitalize text-4xl font-extrabold">
        {" "}
        Total Weekly Output{" "}
      </h1>
      <ul className="text-3xl flex flex-row list-none list-inside justify-around">
        <li className="inline-flex">
          <img className="h-12 w-12" src={icons.gold} alt="roster gold" />
          <span> {gold} </span>
        </li>
        <li className="inline-flex">
          <img src={icons.silver} className="h-12 w-12" alt="silver" /> {silver}
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

      <h1>
        Total <img className="inline-flex" src={icons.gold} alt="roster gold" />{" "}
        Value : {totalGoldValue}{" "}
      </h1>
    </div>
  );
};

const sumCharacterOutput = (characterArray) => {
  const sumObj = {};

  sumObj.gold = characterArray.reduce(
    (sum, char) => sum + char.resources.gold,
    0
  );
  sumObj.silver = characterArray.reduce(
    (sum, char) => sum + char.resources.silver,
    0
  );
  sumObj.leapstones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(
        char.resources.leapstones.type,
        char.resources.leapstones.qty
      ),
    0
  );
  sumObj.leapstones = Math.round(sumObj.leapstones);

  sumObj.gems = characterArray.reduce(
    (sum, char) => sum + char.resources.gems,
    0
  );
  sumObj.gems = Math.round(sumObj.gems);
  sumObj.redStones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(char.resources.redStones.type, char.resources.redStones.qty),

    0
  );
  sumObj.redStones = Math.round(sumObj.redStones);
  sumObj.blueStones = characterArray.reduce(
    (sum, char) =>
      sum +
      stoneConvert(
        char.resources.blueStones.type,
        char.resources.blueStones.qty
      ),
    0
  );
  sumObj.blueStones = Math.round(sumObj.blueStones);

  sumObj.totalGoldValue = calcValue(sumObj);
  return sumObj;
};

export default TotalsDisplay;
