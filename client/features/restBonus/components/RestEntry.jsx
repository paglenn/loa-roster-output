import React from "react";
export const RestEntry = ({ restedOnly }) => {
  return (
    <div className="flex flex-col">
      <text className="text-sm"> Rested only? </text>
      <input
        type="checkbox"
        ref={restedOnly}
        onChange={(e) => (restedOnly.current.value = !restedOnly.current.value)}
      />
    </div>
  );
};
