// character card resources view
import React from "react";
import { resourceTypes, hasSubtype, archetype } from "../utils/reference";
import { getCharValue } from "../utils/sums";
import { Resource } from "./Resource";
import { useSelector } from "react-redux";
import { selectPrices } from "../state/pricesSlice";
import { selectSales } from "../features/edit_prices/salesSlice";
const ResourceView = ({ resources }) => {
  const prices = useSelector(selectPrices);
  const sales = useSelector(selectSales);
  const charGoldValue = getCharValue({ resources }, prices, sales);
  const charGoldValueString = charGoldValue.toLocaleString();
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
        showGoldValue={true}
        classProps={"justify-between"}
      />
    ));

  return (
    <ul className="list-none">
      <li className="flex flex-row justify-between border-b-2 border-black border-dashed">
        <p> Total Gold Value: </p>
        <p className="font-bold"> {charGoldValueString}</p>
      </li>
      {resourceComponents}
    </ul>
  );
};
export default ResourceView;
