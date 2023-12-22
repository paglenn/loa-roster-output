import { updateCharacter } from "../../../utils/api";
import isDoingContent from "../isDoingContent";
const handleChestChange = (e, content, character, updateState) => {
  // set buy property to the status of the checkbox
  const isBuying = e.target.checked;
  content.chest.buy = isBuying;
  if (isBuying) content.gold -= content.chest.cost;

  // check that content is actively being done

  if (!isDoingContent(content, character.goldContent)) {
    return { error: "content not marked as being done " };
  } else {
    const copyCharacter = { ...character };
    // need to find correct content
    let contentIndex = -1;
    copyCharacter.goldContent.forEach((c, index) => {
      if (c._id === content._id) contentIndex = index;
    });
    copyCharacter.goldContent[contentIndex] = content;

    updateCharacter({ ...copyCharacter, goldContentDidUpdate: true }).then(
      (updatedChar) => {
        updateState(updatedChar);
      }
    );
  }
};

export default handleChestChange;
