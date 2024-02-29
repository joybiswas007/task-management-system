const router = require("express").Router();
const { Task } = require("../../models/taskSchema");
const logger = require("../../configs/logger");
const authUser = require("../../middleware/authUser");

router.post(
  "/",
  (req, res, next) => {
    const { userId, title, description, dueDate, priority, category } =
      req.body;
    req.taskData = { userId, title, description, dueDate, priority, category };
    next();
  },
  authUser,
  async (req, res) => {
    try {
      const { userId, title, description, dueDate, priority, category } =
        req.taskData;
      const task = new Task({
        user: userId,
        title,
        description,
        dueDate,
        priority,
        category
      });
      await task.save();
      res
        .status(200)
        .send({ statusCode: 200, message: "task added successfully;" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).send({ statusCode: 500, error: error.message });
    }
  }
);

module.exports = router;
