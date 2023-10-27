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

// stones convert to higher tier ones at a 5:1 ratio. we're really using this as a proxy for price here , which isn't totally accurate - 
//  but it is - oveer sometimes and under sometimes, so overall enough until we do a more careful price calculation.  
export const convertStones= (stoneType, stoneAmount) => {
  return stoneKey[stoneType] * stoneAmount ?? 0;
};

