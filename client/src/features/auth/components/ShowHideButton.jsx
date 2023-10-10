import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const ShowHideButton = ({ isShown, clickHandler }) => {
  return (
    <button
      className="rounded bg-transparent justify-self-end"
      type="button"
      onClick={() => clickHandler()}
    >
      {isShown ? (
        <FaEyeSlash title="hide password" />
      ) : (
        <FaEye title="show password" />
      )}{" "}
    </button>
  );
};
