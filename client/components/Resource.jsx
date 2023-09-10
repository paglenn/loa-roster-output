import React from "react";
import icons from "../helpers/icons";
export const Resource = ({ type, qty, imHeight, classProps }) => {
  // guarantee type singular for gems
  let iconName = type;
  let textStyle = imHeight === 8 ? "text-sm" : null;
  if (type[type.length - 1] === "s") iconName = iconName.slice(0, -1);
  return (
    <li className={`flex flex-row justify-between ${classProps}`}>
      <img
        src={icons[iconName]}
        className={`h-${imHeight} aspect-square rounded-md`}
      />
      <div className={textStyle}> {Math.round(qty).toLocaleString()} </div>
    </li>
  );
};
