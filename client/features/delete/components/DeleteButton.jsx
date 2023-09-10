import React from "react";
export const DeleteButton = ({ name, handleDelete }) => {
  return (
    <button
      id={name}
      onClick={handleDelete}
      className="bg-red-400 rounded border-solid border-black border-2 p-1"
    >
      Delete Character
    </button>
  );
};
