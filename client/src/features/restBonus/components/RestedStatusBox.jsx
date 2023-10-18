import React from "react";

export const RestedStatusBox = ({ restedOnly, handleClick }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm"> Rested? </span>
      <input
        className="accent-green-600 "
        type="checkbox"
        checked={restedOnly}
        onChange={handleClick}
      />
    </div>
  );
};
