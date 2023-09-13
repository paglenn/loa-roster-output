const mongoose = require("mongoose");
const URI = require("../mongo");
const bcrypt = require("bcrypt");
mongoose.connect(URI, { dbName: "test" });

const Schema = mongoose.Schema;

// initialize schema for character
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
});

// pre-save hook
userSchema.pre("save", async function (next) {
  // if you haven't modified the password and it isn't a new user , just move on
  if (!this.isModified(this.password) && !this.isNew) return next();
  // generate salt for hashing with bcrypt
  const salt = await bcrypt.genSalt(10);

  // generate password hash
  const hashedPassword = await bcrypt.hash(this.password, salt);

  // save hashed password instead of original
  this.password = hashedPassword;
});

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
