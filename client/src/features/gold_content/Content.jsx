import React from "react";
import images from "../../utils/assets/content";

export default ({ content }) => {
  return (
    <li role="content grow-0">
      <ul className="flex flex-row list-none">
        <li className="">
          <img src={images[content.name]} />{" "}
        </li>
        <li> {content.level} </li>

        <li> {content.gold} </li>
      </ul>
    </li>
  );
};
