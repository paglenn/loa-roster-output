import classImages from "../utils/assets/classImages";
import React from "react";

export default ({ className}) => {
  return (
    <img
      className={"rounded  grow"}
      src={classImages[className]}
      alt={`${className} class image`}
    />
  );
};
