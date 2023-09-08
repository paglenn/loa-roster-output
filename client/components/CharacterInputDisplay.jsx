import React from "react";

const CharacterInputDisplay = (props) => {
  const { characterInfo, handleChange, handleSubmit } = props;
  if (!characterInfo.name) characterInfo.name = "";
  if (!characterInfo.ilvl) characterInfo.ilvl = "";
  if (!characterInfo._class) characterInfo._class = "";
  if (!characterInfo.isGoldEarner) characterInfo.isGoldEarner = "";

  return (
    <div className="text-xl bg-slate-300 p-5">
      <h2 className="text-2xl"> Add Character </h2>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="flex justify-around"
      >
        <label>
          {" "}
          <text className="text-md"> Name: </text>
          <input type="text" value={characterInfo.name} name="name" />{" "}
        </label>
        <label>
          {" "}
          Class:{" "}
          <input type="text" value={characterInfo._class} name="_class" />{" "}
        </label>
        <label>
          {" "}
          Item Level:{" "}
          <input type="text" value={characterInfo.ilvl} name="ilvl" />{" "}
        </label>
        <label>
          {" "}
          Gold Earner (yes/no):{" "}
          <input
            value={characterInfo.isGoldEarner}
            type="text"
            name="isGoldEarner"
          />{" "}
        </label>
        <input
          className="border-black border-2 rounded bg-green-400 p-1"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CharacterInputDisplay;
