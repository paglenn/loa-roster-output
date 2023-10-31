import React, { useState, useEffect } from "react";
import Content from "./Content";
import { getContent } from "../../../utils/api";
export default ({ ilvl, goldContent , handleContentChange }) => {
  // available content 
  const [content, setContent] = useState([]);
  useEffect(() => getContent(ilvl, setContent), []);

  const contentList = content.map((el, index) => {
    const isDoing = isDoingContent(el, goldContent);
    return <Content key={index} content={el} checked={isDoing} handleChange={handleContentChange} />;
  });
  
  return (
    <ul className="list-none flex flex-col items-stretch overflow-auto max-h-48">
      {" "}
      {contentList}{" "}
    </ul>
  );
};

const isDoingContent = (content, goldContent) => {
  return goldContent.reduce(
    (match, c) => match || c._id === content._id,
    false
  );
};
