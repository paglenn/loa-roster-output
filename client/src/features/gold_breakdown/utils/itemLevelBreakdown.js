import { getCharValue } from "../../../utils/sums";

// for each character in roster, get gold value and add to ilvl bracket
const getGoldValueByIlvl = (roster, prices, sales) => {
  const iLvlBrackets = {
    1250: 0,
    1490: 0,
    1540: 0,
    1580: 0,
    1600: 0,
  };
  roster.forEach((character) => {
    console.log("character ", character);
    const charValue = getCharValue(character, prices, sales);
    if (character.ilvl >= 1600) iLvlBrackets[1600] += charValue;
    else if (character.ilvl >= 1580) iLvlBrackets[1580] += charValue;
    else if (character.ilvl >= 1540) iLvlBrackets[1540] += charValue;
    else if (character.ilvl >= 1490) iLvlBrackets[1490] += charValue;
    else if (character.ilvl >= 1250) iLvlBrackets[1250] += charValue;
  });

  const iLvlBreakdown = [["Item Level", "Value"]];
  iLvlBreakdown.push(["1250-1490", Math.round(iLvlBrackets[1250])]);
  iLvlBreakdown.push(["1490-1540", Math.round(iLvlBrackets[1490])]);
  iLvlBreakdown.push(["1540-1580", Math.round(iLvlBrackets[1540])]);
  iLvlBreakdown.push(["1580-1600", Math.round(iLvlBrackets[1580])]);
  iLvlBreakdown.push(["1600+", Math.round(iLvlBrackets[1600])]);
  console.log("breakdown by ilvl: ", iLvlBreakdown);
  return iLvlBreakdown;
};

export default getGoldValueByIlvl;
