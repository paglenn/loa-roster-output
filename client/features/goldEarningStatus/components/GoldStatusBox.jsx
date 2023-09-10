import React from "react";

const GoldStatusBox = ({ name, ilvl, isGoldEarner, handleGoldUpdate }) => {
  return (
    <div className="flex flex-col">
      <text className="text-sm"> Gold? </text>
      <input
        type="checkbox"
        name={`${name}.${ilvl}`}
        checked={isGoldEarner}
        onChange={handleGoldUpdate}
      />
    </div>
  );
};

export default GoldStatusBox;
