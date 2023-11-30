import React from "react";
import { resourceTypes, hasSubtype, archetype } from "../utils/reference";
import { getCharValue } from "../utils/sums";
import { Resource } from "./Resource";
import { useSelector } from "react-redux";
import { selectPrices } from "../state/pricesSlice";
const ResourceView = ({ resources }) => {
  const prices = useSelector(selectPrices);
  const charGoldValue = getCharValue({ resources }, prices).toLocaleString();

  const resourceComponents = resourceTypes
    .filter(
      (resourceType) =>
        resources.hasOwnProperty(resourceType) ||
        resources.redStones.type == resourceType ||
        resources.blueStones.type == resourceType ||
        resources.leapstones.type == resourceType
    )
    .map((el, index) => (
      <Resource
        key={index}
        type={el}
        qty={
          archetype.hasOwnProperty(el)
            ? resources[archetype[el]].qty
            : resources[el]
        }
        imHeight={8}
        goldValue={charGoldValue}
        showGoldValue={true}
      />
    ));

  return <ul className="list-none"> {resourceComponents}</ul>;
};
export default ResourceView;
