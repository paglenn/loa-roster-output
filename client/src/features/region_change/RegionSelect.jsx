import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRegion } from "./regionSlice";
import { region_change } from "./regionSlice";
import { updatePrices } from "../../utils/reference";
import { update_prices } from "../../state/pricesSlice";
const regions = [
  "Europe Central",
  "North America East",
  "North America West",
  "South America",
];
const RegionSelect = () => {
  const currRegion = useSelector(selectRegion);

  const dispatch = useDispatch();
  const sortedRegions = [
    ...regions.filter((regOption) => regOption === currRegion),
    ...regions.filter((regOption) => regOption !== currRegion),
  ];
  const regionOptions = sortedRegions.map((regOption) => (
    <option value={regOption} key={regOption}>
      {regOption}
    </option>
  ));

  const handleChange = (e) => {
    updatePrices(e.target.value).then((prices) => {
      dispatch(update_prices(prices));
      dispatch(region_change(e.target.value));
    });
  };
  return (
    <section className="m-2 flex flex-col md:flex-row lg:flex-row text-2xl ">
      {" "}
      <p className="text-white mr-2 sm:mb-2"> Region: </p>
      <select name="region rounded-sm" onChange={handleChange}>
        {regionOptions}
      </select>{" "}
    </section>
  );
};
export default RegionSelect;
export { regions };
