import { updateCharacter } from "../../../utils/api";
const handleContentChange = (e, content, character, updateState) => {
  const isDoing = e.target.checked;
  let copyCharacter;
  if (isDoing) {
    // if you're already doing 3 gold contents, can't add more
    if (character.goldContents.length === 3) {
      return { error: "already have three gold earning contents" };
    } else if (
      character.goldContents.filter((el) => el.name === content.name).length !==
      0
    ) {
      // can't do different versions of content with the same name
      return { error: "already doing content of same name" };
    } else {
      // add content to list
      copyCharacter = {
        ...character,
        goldContents: [...character.goldContents, content],
      };
    }
  } else {
    // remove content from list
    copyCharacter = {
      ...character,
      goldContents: character.goldContents.filter((c) => c._id !== content._id),
    };
  }
  updateState(copyCharacter);
  updateCharacter(copyCharacter);

  return;
};

export default handleContentChange;
