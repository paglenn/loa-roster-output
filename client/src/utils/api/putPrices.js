import axios from "axios";
import { vercelPrefix } from "./vercel";

/**
 * Updates prices for a given username by sending a PUT request to the API.
 *
 * @param {string} username - The username to update prices for.
 * @param {object} prices - The prices to update.
 * @return {object} The response data from the API.
 */
const putPrices = async (username, prices) => {
  return axios
    .put(`${vercelPrefix}/api/prices`, { username: username, prices: prices })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default putPrices;
