const { MONGO_URI, mongoose } = require("..");
mongoose.connect(MONGO_URI, { dbName: "test" });

const Schema = mongoose.Schema;

// initialize schema for character
const charSchema = new Schema({
  // item level
  ilvl: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  _class: { type: String, required: true },
  isGoldEarner: { type: Boolean, default: false },
  resources: { type: Object, required: true },
  user: { type: String, default: "test" }, // character's owner
  restedOnly: { type: Boolean, default: false },
  goldContents: {type: Array}
});

module.exports = mongoose.model("Characters", charSchema);
