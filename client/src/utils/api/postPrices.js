import axios from "axios";
import { vercelPrefix } from "./vercel";

/**
 * Posts prices to the API.
 *
 * @param {string} username - The username to post prices for.
 * @param {object} prices - The prices to post.
 * @return {object} The response data from the API.
 */
const postPrices = async (username, prices) => {
  return axios
    .post(`${vercelPrefix}/api/prices`, { username: username, ...prices })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default postPrices;
