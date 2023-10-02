import React from "react";

export const RestedStatusBox = ({ restedOnly, handleClick }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm"> Rested? </span>
      <input type="checkbox" checked={restedOnly} onChange={handleClick} />
    </div>
  );
};
