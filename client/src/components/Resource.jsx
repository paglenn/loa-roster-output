import React from "react";
import icons from "../utils/assets/icons";
export const Resource = ({ type, qty, imHeight, classProps, goldValue }) => {
  // guarantee type singular for gems
  let iconName = type;

  if (type[type.length - 1] === "s") iconName = iconName.slice(0, -1);
  return (
    <li className={`flex flex-row justify-between ${classProps}`}>
      <img
        src={icons[iconName]}
        alt={iconName}
        className={`h-${imHeight} aspect-square rounded-md drop-shadow`}
      />

      <div className="">
        {" "}
        {Math.round(qty).toLocaleString()}{" "}
        {type === "gold" && goldValue ? `(${goldValue})` : null}
      </div>
    </li>
  );
};
