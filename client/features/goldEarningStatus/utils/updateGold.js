import axios from "axios";
const updateGold = (
  event,
  character,
  updateCharacter,
  updateGoldEarners,
  goldEarnerCount
) => {
  // let { name, ilvl, restedOnly } = character;
  let isGoldEarner = event.target.checked;
  /* If we already have six gold earners, can't add another one  */
  if (isGoldEarner && goldEarnerCount === 6) {
    event.target.checked = !event.target.checked;
    console.log("No more gold earners!");
    alert("Nice try - but you can only have up to six gold earners!");
    return;
  }
  // fetch request
  axios({
    method: "patch",
    url: "/character",
    data: {
      ...character,
      isGoldEarner: isGoldEarner,
    },
  }).then(({ data: updatedCharacter }) => {
    updateCharacter(updatedCharacter);
    updateGoldEarners(goldEarnerCount + (isGoldEarner ? 1 : -1));
  });
};

export default updateGold;
