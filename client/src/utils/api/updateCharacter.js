import axios from "axios";
import { vercelPrefix } from "./vercel";
// updateCharacter
// takes in updated character inforomation 
export const updateCharacter= async (characterInfo) => {
  return axios
    .put(`${vercelPrefix}/api/character`, characterInfo)
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};
