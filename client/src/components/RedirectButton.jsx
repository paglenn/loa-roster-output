import React from "react";
const Redirect = ({ handleClick, label }) => {
  return (
    <button onClick={handleClick} className="bg-slate-600 p-1 rounded">
      {label}
    </button>
  );
};
export default Redirect;
