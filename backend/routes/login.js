const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../models/taskSchema");
const logger = require("../configs/logger");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "_id username email password createdAt updatedAt"
    );
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "no user exist with that email address"
      });
    }
    let token;
    token = await Token.findOne({ user: user._id }).select("_id user token");
    const { JWT_SECRET } = process.env;
    if (!token) {
      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "30d"
      });
      token = await Token.create({ user: user._id, token: accessToken });
    }
    const matchPass = bcrypt.compareSync(password, user.password);

    if (!matchPass) {
      return res
        .status(401)
        .send({ statusCode: 401, message: "Incorrect password" });
    }

    res.status(202).send({
      statusCode: 200,
      message: "Authentication successfull",
      user,
      token
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
