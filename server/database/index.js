const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

module.exports = { mongoose, MONGO_URI };
