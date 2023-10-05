import axios from "axios";
import { vercelPrefix } from "./vercel";
export const createNewCharacter = (user, copyCharacter, updateCharacter) => {
  axios
    .post(`${vercelPrefix}/api/character?user=${user}`, { ...copyCharacter })
    .then(({ data }) => updateCharacter(data))
    .catch((err) => {
      alert("Character could not be created");
      console.log(err);
    });
};
