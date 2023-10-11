import axios from "axios";
import { vercelPrefix } from "./vercel";
export const createNewCharacter = (copyCharacter, updateCharacter) => {
  const user = copyCharacter.user;
  axios
    .post(`${vercelPrefix}/api/character?user=${user}`, { ...copyCharacter })
    .then(({ data }) => updateCharacter(data))
    .catch((err) => {
      alert("Character could not be created");
      console.log(err);
    });
};
