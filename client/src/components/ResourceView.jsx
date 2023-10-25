import React from "react";
import { resourceTypes, hasSubtype } from "../utils/reference";
import { getCharValue } from "../utils/sums";
import { Resource } from "./Resource";
const ResourceView = ({ resources }) => {
  const charGoldValue = getCharValue({ resources }).toLocaleString();
  const resourceComponents = resourceTypes.map((el, index) => (
    <Resource
      key={index}
      type={hasSubtype[el] ? resources[el].type : el}
      qty={hasSubtype[el] ? resources[el].qty : resources[el]}
      imHeight={8}
      goldValue={charGoldValue}
      showGoldValue={true}
    />
  ));

  return <ul className="list-none"> {resourceComponents}</ul>;
};
export default ResourceView;
