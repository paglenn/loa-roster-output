import React, { useState, useEffect } from "react";

export default ({ content, checked, handleChange: handleRunChange }) => {
  return (
    <li role="content" className="text-sm py-2">
      <ul className="flex flex-row list-none justify-around">
        <li className="capitalize basis-1/4 grow">
          {content.display_name ?? `${content.name} ${content.level ?? ""}`}
        </li>

        <li className="basis-1/4 grow"> {content.gold.toLocaleString()} </li>
        {/* Doing Content */}
        <li className="basis-1/4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleRunChange(e, content)}
          />
        </li>
        {/* Taking Chest ?  */}
        <li className="basis-1/4">
          <input type="checkbox" checked={content.chest.buy} />
        </li>
      </ul>
    </li>
  );
};
