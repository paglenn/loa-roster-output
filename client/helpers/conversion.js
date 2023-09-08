const stoneKey = {
  marvelous_honor_leapstone: 0.2,
  greater_honor_leapstone: 0.04,
  obliteration_stone: 0.2,
  protection_stone: 0.2,
  crystallized_guardian_stone: 0.04,
  crystallized_destruction_stone: 0.04,
  refined_protection_stone: 1,
  refined_obliteration_stone: 1,
  radiant_honor_leapstone: 1,
};


export const stoneConvert = (stoneType, stoneAmount) => {
  return stoneKey[stoneType] * stoneAmount ?? 0;
};

