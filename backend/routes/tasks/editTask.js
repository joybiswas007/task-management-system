const router = require("express").Router();
const { Task } = require("../../models/taskSchema");
const logger = require("../../configs/logger");
const authUser = require("../../middleware/authUser");

router.post(
  "/",
  authUser,
  (req, res, next) => {
    const { taskId, title, description, dueDate, priority, category } =
      req.body;
    req.taskData = {
      taskId,
      title,
      description,
      dueDate,
      priority,
      category
    };
    next();
  },
  async (req, res) => {
    try {
      const { userId } = req.user.decoded;
      const { taskId, title, description, dueDate, priority, category } =
        req.taskData;
      const tasks = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        { title, description, dueDate, priority, category },
        {
          new: true
        }
      );
      if (!tasks) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Failed to update task." });
      }
      res.status(202).send({ statusCode: 202, message: "Task updated yay!" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).send({ statusCode: 500, error: error.message });
    }
  }
);

module.exports = router;
