const updateGold = (
  event,
  updateCharacter,
  updateGoldEarners,
  goldEarnerCount
) => {
  let [name, ilvl] = event.target.name.split(".");
  ilvl = Number(ilvl);
  let isGoldEarner = event.target.checked;
  /* If we already have six gold earners, can't add another one  */
  if (isGoldEarner && goldEarnerCount === 6) {
    event.target.checked = !event.target.checked;
    console.log("No more gold earners!");
    alert("Nice try - but you can only have up to six gold earners!");
    return;
  }

  fetch("/character", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      ilvl: ilvl,
      isGoldEarner: isGoldEarner,
    }),
  }).then((character) => {
    updateCharacter(character);
    updateGoldEarners(goldEarnerCount + (isGoldEarner ? 1 : -1));
  });
};

export default updateGold;
