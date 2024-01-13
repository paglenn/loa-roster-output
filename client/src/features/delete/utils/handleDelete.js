import requestDelete from "../../../utils/api/deleteCharacter";
const handleDelete = async (event, updateState) => {
  // send a fetch request to delete the character
  // then use updateDeletedCharacter to update state
  // will updateDeletedCharacter to trigger useEffect hook
  await requestDelete(event.target.id)
    .then(() => updateState())
    .catch((err) => {
      console.log(err);
    });
};
export default handleDelete;
