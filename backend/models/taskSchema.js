const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

const User = require("./userModel");
const Token = require("./tokenModel");
const Task = require("./taskModel");

module.exports = { User, Token, Task };
