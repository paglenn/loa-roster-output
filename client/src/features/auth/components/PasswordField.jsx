import React from "react";
import { ShowHideButton } from "./ShowHideButton";
export const PasswordField = ({
  isShown,
  passwordRef,
  description,
  showHandler,
}) => {
  const type = isShown ? "text" : "password";
  return (
    <div className="pl-5 flex flex-row bg-transparent border-white border-b-2 self-stretch justify-between">
      <input
        type={type}
        className="rounded text-white bg-transparent"
        placeholder="Password"
        onChange={(e) => (passwordRef.current = e.target.value)}
      />
      <ShowHideButton isShown={isShown} clickHandler={showHandler} />
    </div>
  );
};
