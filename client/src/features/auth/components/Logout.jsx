//Logging out is frontend state management - we
// 1. clear user state
// 2. redirect to login page
import React from "react";
const LogoutButton = ({ clickHandler }) => {
  return (
    <button
      className="rounded-sm bg-red-500 p-1 border-2 border-black"
      onClick={clickHandler}
    >
      LOG OUT
    </button>
  );
};

export default LogoutButton;
