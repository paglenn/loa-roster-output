import React from "react";

export const RestedStatusBox = ({ restedOnly, handleClick}) => {
  return (
    <div className="flex flex-col">
      <text className="text-sm"> Rested? </text>
      <input
        type="checkbox"
        checked={restedOnly}
        onChange={handleClick}
      />
    </div>
  );
};
