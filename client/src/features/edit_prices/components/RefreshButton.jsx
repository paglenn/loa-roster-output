import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
const RefreshButton = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="bg-cyan-600 flex flex-row rounded items-center p-1 justify-between"
    >
      {" "}
      <div className="mr-2"> Refresh Prices</div>
      <div>
        <FaArrowsRotate />{" "}
      </div>
    </button>
  );
};

export default RefreshButton;
