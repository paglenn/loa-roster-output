import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
const RefreshButton = ({ clickHandler }) => {
  return (
    <button onClick={clickHandler} className="bg-cyan-600">
      {" "}
      Refresh Prices <FaArrowsRotate />{" "}
    </button>
  );
};

export default RefreshButton;
