import axios from "axios";
import { vercelPrefix } from "./vercel";

/**
 * Retrieves prices from the API based on the provided username.
 *
 * @param {string} username - The username to retrieve prices for.
 * @return {object} An object containing the retrieved prices.
 */
const getPrices = async (username) => {
  console.log("username: ", username);

  return axios
    .get(`${vercelPrefix}/api/prices?user=${username ?? "test"}`)
    .then((res) => {
      if (!res.data.prices) return {};

      const { username, _id, __v, ...prices } = res.data.prices;

      return prices;
    })
    .catch((err) => console.log(err));
};

export default getPrices;
