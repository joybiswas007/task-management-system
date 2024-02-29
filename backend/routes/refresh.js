const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authUser");
const { Token } = require("../models/taskSchema");
const logger = require("../configs/logger");

router.post("/", authUser, async (req, res) => {
  try {
    const { accessToken: token } = req.user;
    const { userId, exp } = req.user.decoded;

    const now = new Date();
    const expirationTime = new Date(exp * 1000);
    if (expirationTime < now) {
      const { JWT_SECRET } = process.env;
      // Token is expired, generate a new token
      const newAccessToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "30d"
      });
      // Find the user's token document
      const userToken = await Token.findOne({ user: userId, token });

      if (!userToken) {
        return res
          .status(404)
          .send({ statusCode: 404, message: "Token not found" });
      }

      // Move expired token to expiredTokens array
      userToken.expiredTokens.push({ token, expireAt: expirationTime });

      // Update token document with the new token and expiration time
      userToken.token = newAccessToken;
      userToken.expireAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      await userToken.save();

      // Return the new access token
      return res.status(202).send({
        statusCode: 202,
        token: newAccessToken,
        message: "Your new token."
      });
    }

    // Token is still valid, return the same token
    res
      .status(200)
      .send({ statusCode: 200, token, message: "Token is still valid" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
