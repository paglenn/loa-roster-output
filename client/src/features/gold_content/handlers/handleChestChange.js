import { updateCharacter } from "../../../utils/api";
import isDoingContent from "../isDoingContent";
const handleChestChange = (e, content, character, updateState) => {
  // set buy property to the status of the checkbox
  const isBuying = e.target.checked;

  if (isBuying) content.gold -= content.chest.cost;
  else content.gold += content.chest.cost;
  content.chest.buy = isBuying;
  // check that content is actively being done

  if (!isDoingContent(content, character.goldContents)) {
    return { error: "content not marked as being done " };
  } else {
    const copyCharacter = JSON.parse(JSON.stringify(character));
    // need to find correct content

    copyCharacter.goldContents.forEach((c, index) => {
      if (c._id === content._id) {
        console.log("content", content);

        copyCharacter.goldContents[index] = content;
      }
    });

    updateCharacter({ ...copyCharacter }).then(() => {
      updateState();
    });
  }
};

export default handleChestChange;
