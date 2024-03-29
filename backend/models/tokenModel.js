const mongoose = require("mongoose");
const { schemaOptions } = require("../configs/dbConfig");
const User = require("./userModel");

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date
    },
    expiredTokens: [
      {
        token: String,
        expireAt: Date
      }
    ]
  },
  schemaOptions
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
