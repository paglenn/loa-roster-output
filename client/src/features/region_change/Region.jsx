import React from "react";
const regions = [
  "North America East",
  "North America West",
  "Europe Central",
  "South America",
];
const Region = ({ handleChange, region }) => {
  const sortedRegions = [
    ...regions.filter((region) => region === localStorage.getItem("region")),
    ...regions.filter((region) => region !== localStorage.getItem("region")),
  ];
  const regionOptions = sortedRegions.map((region) => (
    <option value={region} key={region}>
      {region}
    </option>
  ));
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
export default Region;
