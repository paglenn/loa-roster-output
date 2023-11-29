//Logging out is frontend state management - we
// 1. clear user state
// 2. redirect to login page
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../state/userSlice";
const LogoutButton = ({ clickHandler }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="rounded-sm bg-red-500 p-1 border-2 border-black"
      onClick={() => {
        clickHandler();
        dispatch(logout());
      }}
    >
      LOG OUT
    </button>
  );
};

export default LogoutButton;
