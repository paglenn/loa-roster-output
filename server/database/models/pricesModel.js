const { MONGO_URI, mongoose } = require("..");

mongoose.connect(MONGO_URI, { dbName: "test" });

const Schema = mongoose.Schema;

// initialize schema for prices
const priceSchema = new Schema({
  username: { type: String, unique: true },
  gems: { type: Number, default: 7000 },
  leapstones: { type: Number },
  redStones: { type: Number },
  blueStones: { type: Number },
  marvelous_honor_leapstone: { type: Number },
  greater_honor_leapstone: { type: Number },
  obliteration_stone: { type: Number },
  protection_stone: { type: Number },
  crystallized_guardian_stone: { type: Number },
  crystallized_destruction_stone: { type: Number },
  refined_protection_stone: { type: Number },
  refined_obliteration_stone: { type: Number },
  radiant_honor_leapstone: { type: Number },
  destiny_leapstone: { type: Number },
  destiny_guardian_stone: { type: Number },
  destiny_destruction_stone: { type: Number },
});

module.exports = mongoose.model("Prices", priceSchema);
