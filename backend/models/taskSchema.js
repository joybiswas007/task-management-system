const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

const User = require("./userModel");
const Token = require("./tokenModel");

module.exports = { User, Token };
