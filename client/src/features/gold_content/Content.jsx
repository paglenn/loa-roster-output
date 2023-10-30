import React from "react";
import images from "../../utils/assets/content";

export default ({ content, checked }) => {
  return (
    <li role="content" className="text-sm py-2">
      <ul className="flex flex-row list-none justify-around">
        <li className="basis-1/4">
          <input type="checkbox" checked={checked} />
        </li>
        {/*We were rendering the images here, but it's taking up too much space right now */}
        {/* {checked ? (
          <li className="basis-1/4">
            <img
              src={images[content.name]}
              className="max-h-12 aspect-square rounded-lg"
            />
          </li>
        ) : null} */}
        <li className="capitalize basis-1/4 grow">
          {content.display_name ?? `${content.name} ${content.level ?? ""}`}
        </li>

        <li className="basis-1/4 grow"> {content.gold.toLocaleString()} </li>
      </ul>
    </li>
  );
};
