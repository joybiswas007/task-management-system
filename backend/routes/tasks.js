const router = require("express").Router();
const { Task } = require("../models/taskSchema");
const logger = require("../configs/logger");
const authUser = require("../middleware/authUser");

router.post("/", authUser, async (req, res) => {
  try {
    const { user } = req;
    const tasks = await Task.find({ user: user.userId });
    if (tasks.length > 0) {
      return res.status(200).send({ statusCode: 200, tasks });
    }
    res.status(404).send({ statusCode: 404, message: "No tasks added yet!" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
