export const handleDelete = (event, updateCharacter) => {
  // send a fetch request to delete the character
  // then use updateDeletedCharacter to update state
  // will updateDeletedCharacter to trigger useEffect hook
  fetch("/character", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: event.target.id }),
  }).then((character) => {
    updateCharacter(character);
  });
};