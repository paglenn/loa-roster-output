import axios from "axios";
import { vercelPrefix } from "./vercel";
export const createNewCharacter = async (newCharacter) => {
  const user = newCharacter.user;
  return axios
    .post(`${vercelPrefix}/api/character?user=${user}`, { ...newCharacter })
    .then(({ data }) => {
      console.log("api response: ", data);
      return { ...data };
    })
    .catch((err) => {
      alert("Character could not be created");
      console.log(err);
    });
};
