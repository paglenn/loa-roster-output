import React, { useState, useEffect } from "react";
import Content from "./Content";
import { getContent } from "../../../utils/api";
import isDoingContent from "../isDoingContent";
export default ({ ilvl, goldContent, handleContentChange }) => {
  // available content
  const [content, setContent] = useState([]);
  useEffect(() => getContent(ilvl, setContent), []);

  const contentList = content.map((el, index) => {
    const isDoing = isDoingContent(el, goldContent);
    return (
      <Content
        key={index}
        content={el}
        checked={isDoing}
        handleChange={handleContentChange}
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
