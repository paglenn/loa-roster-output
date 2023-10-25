import React from "react";
export default ShowContentButton = ({ isContentShown, clickHandler }) => {
  return (
    <button onClick={clickHandler} className="bg-cyan-300">
      {isContentShown ? "Hide Content" : "Show Content"}
    </button>
  );
};
