import React, { useState, useEffect } from "react";
import Content from "./Content";
import { getContent } from "../../../utils/api";
import isDoingContent from "../isDoingContent";
import isBuyingChest from "../isBuyingChest";
export default ({ character }) => {
  const { ilvl, goldContents } = character;
  // available content
  const [content, setContent] = useState([]);
  const getContentOptions = async () => {
    const contentOptionsList = await getContent(ilvl);
    console.log(contentOptionsList);
    setContent(contentOptionsList);
  };

  useEffect(() => {
    getContentOptions();
  }, []);

  const contentList = [...content]
    .sort((a, b) => b.ilvl - a.ilvl)
    .map((el, index) => {
      const isDoing = isDoingContent(el, goldContents);
      const chest = isBuyingChest(el, goldContents);
      return (
        <Content
          key={index}
          content={el}
          checked={isDoing}
          isBuyingChest={chest}
          character={character}
        />
      );
    });

  return (
    <ul className="list-none flex flex-col items-stretch overflow-auto max-h-48">
      <li className="flex flex-row justify-around">
        <h3> Name </h3>
        <h3> Gold </h3>
        <h3> Take Gold? </h3>
        <h3> Buy Chest? </h3>
      </li>{" "}
      {contentList}{" "}
    </ul>
  );
};
