const dotenv = require("dotenv");
dotenv.config();
module.exports = process.env.MONGO_URI;
