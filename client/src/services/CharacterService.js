import { updateCharacter, createNewCharacter, getRoster } from "../utils/api";
class CharacterService {
  constructor() {}

  async update(characterInfo) {
    return updateCharacter(characterInfo);
  }

  async create(newCharacter, numGoldEarners) {
    // copyCharacter is an object with all the character information
    // copycharacter.ilvl is a string by default - we need to convert to a number
    newCharacter.ilvl = Number(newCharacter.ilvl);
    newCharacter.isGoldEarner = Boolean(newCharacter.isGoldEarner);
    console.log("new character pre-creation: ", newCharacter);
    // assert that destructuring of character info produces all necessary properties
    const { name, ilvl, isGoldEarner, _class } = newCharacter;
    if (name === "" || Number.isNaN(ilvl) || _class === "") {
      console.log("Character info incomplete!");
      alert("Character info incomplete!");
      return;
    }
    if (isGoldEarner && numGoldEarners >= 6) {
      console.log("Max gold earners reached!");
      alert("Max gold earners reached!");
      return;
    }

    const character = await createNewCharacter(newCharacter);

    return character;
  }

  async GetAll(user) {
    return await getRoster(user);
  }
}

export default CharacterService;
