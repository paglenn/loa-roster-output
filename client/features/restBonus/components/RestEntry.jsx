import React from "react";
export const RestEntry = ({ restOnly }) => {
  return (
    <div className="flex flex-col">
      <text className="text-sm"> Rested only? </text>
      <input
        type="checkbox"
        ref={restOnly}
        onChange={(e) => (restOnly.current.value = !restOnly.current.value)}
      />
    </div>
  );
};
