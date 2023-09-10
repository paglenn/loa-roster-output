import React from "react";

export const RestedStatusBox = ({ name, ilvl, isRestedOnly, handleRestedUpdate }) => {
  return (
    <div className="flex flex-col">
      <text className="text-sm"> Rest? </text>
      <input
        type="checkbox"
        name={`${name}.${ilvl}`}
        checked={isRestedOnly}
        onChange={handleRestedUpdate}
      />
    </div>
  );
};
