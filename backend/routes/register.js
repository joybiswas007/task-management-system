const router = require("express").Router();
const bcrypt = require("bcrypt");
const logger = require("../configs/logger");
const { User } = require("../models/taskSchema");

router.post("/", async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;

    // Check if passwords match
    if (password !== password2) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Passwords don't match" });
    }

    // Check password length
    if (password.length <= 8 || password.length >= 72) {
      return res.status(400).send({
        statusCode: 400,
        message: "Password must between 8 and 72 characters",
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
