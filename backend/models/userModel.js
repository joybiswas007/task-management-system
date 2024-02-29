const mongoose = require("mongoose");
const { schemaOptions } = require("../configs/dbConfig");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  schemaOptions,
);

const User = mongoose.model("User", userSchema);

module.exports = User;
