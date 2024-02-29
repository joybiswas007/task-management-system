const mongoose = require("mongoose");
const { schemaOptions } = require("../configs/dbConfig");
const User = require("./userModel");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true, enum: ["Low", "Medium", "Hard"] },
    category: { type: String }
  },
  schemaOptions
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
