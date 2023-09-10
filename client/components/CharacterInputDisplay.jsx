import React from "react";
import { charPropLabels } from "../helpers/reference";
const CharacterInputDisplay = (props) => {
  const { characterInfo, handleChange, handleSubmit } = props;
  if (!characterInfo.name) characterInfo.name = "";
  if (!characterInfo.ilvl) characterInfo.ilvl = "";
  if (!characterInfo._class) characterInfo._class = "";
  if (!characterInfo.isGoldEarner) characterInfo.isGoldEarner = "";

  const charProps = Object.keys(characterInfo).map((prop) => {
    return <InputLabel charPropName={prop} charPropVal={characterInfo[prop]} />;
  });

  return (
    <div className="text-xl bg-slate-300 p-5">
      <h2 className="text-center text-2xl underline pb-2"> Add New Character </h2>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="flex justify-around"
      >
        {charProps}
        <input
          className="border-black border-2 rounded bg-green-400 p-1"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

const InputLabel = ({ charPropVal, charPropName }) => {
  return (
    <label className="inline-flex align-middle">
      <span className="text-xl"> {charPropLabels[charPropName]}: </span>
      <input value={charPropVal} type="text" name={charPropName} />
    </label>
  );
};
export default CharacterInputDisplay;
