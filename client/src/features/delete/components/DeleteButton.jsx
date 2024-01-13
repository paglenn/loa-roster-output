import React from "react";
import handleDelete from "../utils/handleDelete";
export const DeleteButton = ({ name, refresh }) => {
  const handleClick = (e) => {
    handleDelete(e, refresh);
  };
  return (
    <div className="flex justify-end text-sm">
      <button
        id={name}
        onClick={handleClick}
        className="bg-red-400 rounded border-solid border-black border-2 p-1"
      >
        Delete Character
      </button>
    </div>
  );
};
