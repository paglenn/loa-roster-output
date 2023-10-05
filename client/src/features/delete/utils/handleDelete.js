import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
export const handleDelete = async (event, updateCharacter) => {
  // send a fetch request to delete the character
  // then use updateDeletedCharacter to update state
  // will updateDeletedCharacter to trigger useEffect hook
  await axios
    .delete(`${vercelPrefix}/api/character`, {
      data: {
        name: event.target.id,
      },
    })
    .then(({ data }) => updateCharacter(data))
    .catch((err) => {
      console.log(err);
    });
};
