const router = require("express").Router();
const { Task } = require("../../models/taskSchema");
const logger = require("../../configs/logger");
const authUser = require("../../middleware/authUser");

router.post(
  "/",
  authUser,
  (req, res, next) => {
    const { taskId } = req.body;
    req.taskData = {
      taskId
    };
    next();
  },
  async (req, res) => {
    try {
      const { userId } = req.user.decoded;
      const { taskId } = req.taskData;
      const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
      if (!task) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Failed to delete task" });
      }
      res.status(202).send({ statusCode: 202, message: "Task deleted!" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).send({ statusCode: 500, error: error.message });
    }
  }
);

module.exports = router;
