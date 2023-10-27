import React from "react";
import images from "../../utils/assets/content";

export default ({ content }) => {
  return (
    <li role="content" className="text-sm py-2">
      <ul className="flex flex-row list-none justify-around">
        <li className="basis-1/3">
          <img
            src={images[content.name]}
            className="max-h-12 aspect-square rounded-lg"
          />
        </li>
        <li className="capitalize basis-1/3 grow">
          {content.display_name ?? `${content.name} ${content.level ?? ""}`}
        </li>

        <li className="basis-1/3 grow"> {content.gold} </li>
      </ul>
    </li>
  );
};
