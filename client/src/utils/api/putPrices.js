import axios from "axios";
import { vercelPrefix } from "./vercel";

const putPrices = async (username, prices) => {
  return axios
    .put(`${vercelPrefix}/api/prices`, { username: username, ...prices })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default putPrices;
