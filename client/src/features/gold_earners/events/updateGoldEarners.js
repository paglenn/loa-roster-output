import axios from "axios";
import { vercelPrefix } from "../../../utils/api/vercel";
const updateGoldEarners = (event, character, updateCharacter, goldEarners) => {
  // let { name, ilvl, restedOnly } = character;
  let isGoldEarner = event.target.checked;
  /* If we already have six gold earners, can't add another one  */
  if (isGoldEarner && goldEarners.current === 6) {
    event.target.checked = !event.target.checked;
    alert("Nice try - but you can only have up to six gold earners!");
    return;
  }
  // fetch request
  axios({
    method: "PUT",
    url: `${vercelPrefix}/api/character`,
    data: {
      ...character,
      isGoldEarner: isGoldEarner,
    },
  }).then(({ data: updatedCharacter }) => {
    updateCharacter(updatedCharacter);
    goldEarners.current += isGoldEarner ? 1 : -1;
  });
};

export default updateGoldEarners;
