import React from "react";
export default ({ isContentShown, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="bg-cyan-300 border-black border-2 rounded p-1 basis-2/5 mr-2"
    >
      {isContentShown ? "Hide Content" : "Show Content"}
    </button>
  );
};
