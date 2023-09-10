const mongoose = require("mongoose");
const URI = require("../mongo");
mongoose.connect(URI, { dbName: "test" });

const Schema = mongoose.Schema;

// initialize schema for character
const charSchema = new Schema({
  // item level
  ilvl: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  _class: { type: String, required: true },
  isGoldEarner: { type: Boolean, required: true },
  resources: { type: Object, required: true },
  user: { type: String, default: "test" }, // character's owner
  restedOnly: { type: Boolean, default: false },
});

module.exports = mongoose.model("Characters", charSchema);
