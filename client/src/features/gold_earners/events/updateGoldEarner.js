import { updateCharacter } from "../../../utils/api";

const updateGoldEarner = async (
  event,
  character,
  goldEarners,
  updateGoldEarnerState
) => {
  // let { name, ilvl, restedOnly } = character;
  let isGoldEarner = event.target.checked;
  /* If we already have six gold earners, can't add another one  */
  if (isGoldEarner && goldEarners === 6) {
    event.target.checked = !event.target.checked;
    alert("Nice try - but you can only have up to six gold earners!");
    return;
  }
  // fetch request
  updateCharacter({
    ...character,
    isGoldEarner: isGoldEarner,
  }).then(({ data: updatedCharacter }) => {
    updateCharacter(updatedCharacter);
    updateGoldEarnerState(goldEarners + isGoldEarner ? 1 : -1);
  });
};

export default updateGoldEarner;
