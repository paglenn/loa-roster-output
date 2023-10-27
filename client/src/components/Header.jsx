import React from "react";
import logo from "../assets/lostarkicon.png";

const Header = () => {
  return (
    <h1 className="pb-2">
      <div className="uppercase text-center text-white text-3xl">
        <img
          className="float-left h-fit max-h-8 w-8 align-top"
          src={logo}
          alt="Lost Ark Logo Left"
        />
        Lost Ark Roster Production
        <img
          className="float-right h-fit  max-h-8 w-8 align-top"
          src={logo}
          alt="Lost Ark Logo Right"
        />
      </div>
    </h1>
  );
};

export default Header;
