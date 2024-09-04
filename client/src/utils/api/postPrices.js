import axios from "axios";
import { vercelPrefix } from "./vercel";

const postPrices = async (username, prices) => {
  return axios
    .post(`${vercelPrefix}/api/prices`, { username: username, ...prices })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default postPrices;
