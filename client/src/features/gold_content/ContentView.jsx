import React from "react";
import Content from "./Content";
export default contentView = ({ goldContent }) => {
  const contentList = goldContent.map((el, index) => (
    <Content key={index} content={el} />
  ));
  console.log(contentList);
  return <ul className="list-none flex flex-col "> {contentList} </ul>;
};
