import { vercelPrefix } from "./vercel";
import axios from "axios";
export const getRoster = (user, updateRoster, goldEarners) => {
  axios
    .get(`${vercelPrefix}/api/character/characters?user=${user}`)
    .then((response) => response.data)
    .then((characters) => {
      characters.sort((a, b) => {
        if (a.isGoldEarner && !b.isGoldEarner) return -1;
        if (!a.isGoldEarner && b.isGoldEarner) return 1;
        return b.ilvl - a.ilvl;
      })
      updateRoster(characters);
      goldEarners.current = characters.reduce(
        (sum, character) => sum + (character.isGoldEarner ? 1 : 0),
        0
      );
    })
    .catch((err) => console.log("in update roster effect hook: ", err));
};
