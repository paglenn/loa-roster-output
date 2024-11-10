import { getCharValue } from "../../../utils/sums";

// for each character in roster, get gold value and add to ilvl bracket

const cutLines = [1250, 1490, 1540, 1580, 1640];
const getGoldValueByIlvl = (roster, prices, sales) => {
  const iLvlBrackets = cutLines.reduce((obj, ilvl) => {
    obj[ilvl] = 0;
    return obj;
  }, {});

  roster.forEach((character) => {
    console.log("character ", character);
    const charValue = getCharValue(character, prices, sales);
    const charCutLine = getCutLine(character.ilvl);
    iLvlBrackets[charCutLine] += charValue;
  });

  const iLvlBreakdown = [["Item Level Cutoff", "Value"]];
  cutLines.forEach((ilvl) => {
    if (iLvlBrackets[ilvl] > 0)
      iLvlBreakdown.push([ilvl.toString(), Math.round(iLvlBrackets[ilvl])]);
  });

  console.log("breakdown by ilvl: ", iLvlBreakdown);
  return iLvlBreakdown;
};

const getCutLine = (iLvl) => {
  for (let i = 0; i < cutLines.length; i++) {
    if (iLvl < cutLines[i]) {
      return cutLines[i - 1];
    }
  }
  return cutLines[cutLines.length - 1];
};

export { cutLines };
export default getGoldValueByIlvl;
