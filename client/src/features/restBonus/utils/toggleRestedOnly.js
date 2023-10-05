import { vercelPrefix } from "../../../utils/api/vercel";
export const toggleRestedOnly = (event, character, updateCharacter) => {
  // get name and ilvl of character
  const restedOnly = event.target.checked;
  // send fetch request ot update character with checked status of checkbox
  fetch(`${vercelPrefix}/api/character`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...character,
      restedOnly: restedOnly,
    }),
  }).then((updatedCharacter) => {
    updateCharacter(updatedCharacter);
  });
  // return updated character and invoke updateCharacter with updated character
};
