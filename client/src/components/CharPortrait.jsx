import classImages from "../utils/assets/classImages";
import React from "react";

export default ({ classLower }) => {
  return (
    <img
      className={"rounded  grow"}
      src={classImages[classLower]}
      alt={`${classLower} class image`}
    />
  );
};
