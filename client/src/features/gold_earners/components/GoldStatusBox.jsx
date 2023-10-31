import React from "react";

const GoldStatusBox = ({ isGoldEarner, handleClick }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm"> Gold? </span>
      <input
        type="checkbox"
        checked={isGoldEarner}
        onChange={handleClick}
      />
    </div>
  );
};

export default GoldStatusBox;
