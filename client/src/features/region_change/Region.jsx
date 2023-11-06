import React from "react";
const Region = ({handleChange}) => {
  return (<select name="region" onChange={handleChange}> 
  <option value="North America East"> North America East</option> 
  <option value="North America West"> North America West</option> 
  <option value="Europe Central"> Europe Central</option> 
  <option value="South America"> South America </option> 
  </select>)
}
export default Region ; 