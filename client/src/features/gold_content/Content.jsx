import React from "react";
import images from "../../utils/assets/content";

export default Content = ({ content }) => {
  return (
    <li role="content">
      <ul className="flex flex-row list-none">
        <li>
          <img src={images[content.name]} />{" "}
        </li>
        <li> {content.level} </li>

        <li> {content.gold} </li>
      </ul>
    </li>
  );
};
