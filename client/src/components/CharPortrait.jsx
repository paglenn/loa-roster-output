import classImages from "../helpers/classImages";
import React from "react";

export default ({ classLower }) => {
  return (
    <img
      className={"rounded w-fit"}
      src={classImages[classLower]}
      alt={`${classLower} class image`}
    />
  );
};
