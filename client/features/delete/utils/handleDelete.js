import axios from "axios";
export const handleDelete = (event, updateCharacter) => {
  // send a fetch request to delete the character
  // then use updateDeletedCharacter to update state
  // will updateDeletedCharacter to trigger useEffect hook
  axios
    .delete("/character", {
      data: {
        name: event.target.id,
      },
    })
    .then(({ data }) => updateCharacter(data));
};
