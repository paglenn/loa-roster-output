// Sole Function : sum roster output into one object
// input character array
// output key-value pairs
// {resource_type : amount roster produces }
const combineRosterResources = (characterArray) => {
  return characterArray.reduce((sum, char) => {
    // sum over char properties
    if (char.isGoldEarner) {
      if (sum.gold) sum.gold += char.resources.gold;
      else sum.gold = char.resources.gold;
    }

    if (sum.silver) sum.silver += char.resources.silver;
    else sum.silver = char.resources.silver;

    if (sum[char.resources.leapstones.type])
      sum[char.resources.leapstones.type] += char.resources.leapstones.qty;
    else sum[char.resources.leapstones.type] = char.resources.leapstones.qty;

    if (sum.gems) sum.gems += char.resources.gems;
    else sum.gems = char.resources.gems;

    if (sum.hasOwnProperty(char.resources.redStones.type)) {
      sum[char.resources.redStones.type] += char.resources.redStones.qty;
    } else sum[char.resources.redStones.type] = char.resources.redStones.qty;

    if (sum[char.resources.blueStones.type]) {
      sum[char.resources.blueStones.type] += char.resources.blueStones.qty;
    } else sum[char.resources.blueStones.type] = char.resources.blueStones.qty;

    return sum;
  }, {});
};

export default combineRosterResources;
