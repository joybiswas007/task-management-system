const router = require("express").Router();
const authUser = require("../middleware/authUser");
const { Token } = require("../models/taskSchema");
const logger = require("../configs/logger");

router.post("/", authUser, async (req, res) => {
  try {
    const { accessToken: token } = req.user;
    const { userId } = req.user.decoded;
    const logout = await Token.findOneAndDelete({ user: userId, token });
    if (!logout) {
      return res.status(400).send({
        statusCode: 400,
        message: "You aren't authorized to perform this action."
      });
    }
    res.status(200).send({ statusCode: 200, message: "Logout successfull" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
