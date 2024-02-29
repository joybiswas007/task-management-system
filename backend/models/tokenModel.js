const mongoose = require("mongoose");
const { schemaOptions } = require("../configs/dbConfig");
const User = require("./userModel");

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    tokens: [{ token: String }],
  },
  schemaOptions,
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
