import React from "react";
import icons from "../icons.js";
export const Resource = ({ type, qty }) => {
  // guarantee type singular for gems
  let iconName = type;
  if (type[type.length - 1] === "s") iconName = iconName.slice(0, -1);
  return (
    <li className="flex flex-row justify-between">
      <img src={icons[iconName]} className="h-8 w-8 rounded-md" />
      <div className="text-sm"> {Math.round(qty).toLocaleString()} </div>
    </li>
  );
};
