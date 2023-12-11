import { updateCharacter } from "../../../utils/api";
export const toggleRestedOnly = (event, character, updateCharState) => {
  // get name and ilvl of character
  const restedOnly = event.target.checked;
  // send fetch request ot update character with checked status of checkbox
  updateCharacter({
    ...character,
    restedOnly: restedOnly,
    restedStatusDidUpdate: true,
  }).then((updatedCharacter) => {
    updateCharState(updatedCharacter);
  });
  // return updated character and invoke updateCharacter with updated character
};
