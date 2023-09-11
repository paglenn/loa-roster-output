import React from "react";

const GoldStatusBox = ({ isGoldEarner, handleGoldUpdate }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm"> Gold? </span>
      <input
        type="checkbox"
        checked={isGoldEarner}
        onChange={handleGoldUpdate}
      />
    </div>
  );
};

export default GoldStatusBox;
