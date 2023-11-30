//Logging out is frontend state management - we
// 1. clear user state
// 2. redirect to login page
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../state/userSlice";
const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      className="rounded-sm bg-red-500 p-1 border-2 border-black"
      onClick={() => {
        dispatch(logout());
        navigate("/");
      }}
    >
      LOG OUT
    </button>
  );
};

export default LogoutButton;
