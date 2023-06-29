const mongoose = require("mongoose");
//mongoose.connect()

const sun1={ 
  'ilvl': 1370, 
  'silver':  61531, 
  'shards': 1801, 
  'leapstones':  {'type': 'greater_honor_leapstone', 'qty':3.4}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':58.7},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty':177.9},
  'gems': 5.0
}; 

const sun2={ 
  'ilvl': 1385, 
  'silver':  59720, 
  'shards': 1958, 
  'leapstones': {'type': 'greater_honor_leapstone', 'qty':3.8}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':62.2},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty': 196.1},
  'gems': 4.9
}; 

const sun3={ 
  'ilvl': 1400, 
  'silver': 60418, 
  'shards': 2095, 
  'leapstones': {'type': 'greater_honor_leapstone', 'qty':3.9}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':66.1},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty':208.4},
  'gems': 5.6
}; 

const corruption1={ 
  'ilvl': 1415, 
  'silver': 70380, 
  'shards': 2447, 
  'leapstones': {'type': 'greater_honor_leapstone', 'qty':4.6}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':82.6},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty':229.0},
  'gems': 6.3
}; 


const corruption2={ 
  'ilvl': 1445, 
  'silver': 69470, 
  'shards': 2584, 
  'leapstones': {'type': 'greater_honor_leapstone', 'qty':5.8}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':87.1},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty':241.5},
  'gems': 7.1
}; 

const corruption3={ 
  'ilvl': 1475, 
  'silver': 69184, 
  'shards': 2790, 
  'leapstones': {'type': 'greater_honor_leapstone', 'qty':5.5}, 
  'red_stones': {'type': 'crystallized_destruction_stone', 'qty':90.7},
  'blue_stones': {'type': 'crystallized_guardian_stone', 'qty':260.9},
  'gems': 6.9
}; 

const void1={ 
  'ilvl': 1490, 
  'silver': 72372, 
  'shards': 5226, 
  'leapstones': {'type': 'marvelous_honor_leapstone', 'qty':3}, 
  'red_stones': {'type': 'obliteration_stone', 'qty':52.9},
  'blue_stones': {'type': 'protection_stone', 'qty':150.7},
  'gems': 7.6
}; 

const void2={ 
  'ilvl': 1520, 
  'silver': 74186, 
  'shards': 6837, 
  'leapstones': {'type': 'marvelous_honor_leapstone', 'qty':3.8}, 
  'red_stones': {'type': 'obliteration_stone', 'qty':57.8},
  'blue_stones': {'type': 'protection_stone', 'qty':182.2},
  'gems': 9.7
}; 

const despair1={ 
  'ilvl': 1540, 
  'silver': 78166, 
  'shards': 7916, 
  'leapstones': {'type': 'marvelous_honor_leapstone', 'qty':4.7}, 
  'red_stones': {'type': 'obliteration_stone', 'qty':71.8},
  'blue_stones': {'type': 'protection_stone', 'qty':212.4},
  'gems': 10.1
}; 

const despair2={ 
  'ilvl': 1560, 
  'silver': 78240, 
  'shards': 9299, 
  'leapstones': {'type': 'marvelous_honor_leapstone', 'qty':6.1}, 
  'red_stones': {'type': 'obliteration_stone', 'qty':82.5},
  'blue_stones': {'type': 'protection_stone', 'qty':242},
  'gems': 10.6
}; 
const objectArray = [sun1, sun2, sun3, corruption1, corruption2, corruption3, void1, void2,despair1, despair2];
console.log(objectArray);