import { vercelPrefix } from "./vercel";
import axios from "axios";

const requestDelete = async (charName) => {
  return axios
    .delete(`${vercelPrefix}/api/character`, {
      data: {
        name: charName,
      },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
    });
};
export default requestDelete;
