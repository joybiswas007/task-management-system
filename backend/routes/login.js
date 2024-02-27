const router = require("express").Router();
const { User } = require("../models/taskSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../configs/logger");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "no user exist with that email address",
      });
    }

    const matchPass = bcrypt.compareSync(password, user.password);

    if (!matchPass) {
      return res
        .status(401)
        .send({ statusCode: 401, message: "Incorrect password" });
    }

    const { JWT_SECRET } = process.env;
    //Generate jwt token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(202).send({
      statusCode: 200,
      message: "Authentication successfull",
      user,
      token,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
