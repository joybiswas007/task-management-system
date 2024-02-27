require("dotenv").config();
const express = require("express");

const app = express();
const helmet = require("helmet");
const cors = require("cors");

const logger = require("./configs/logger");

const { PORT } = process.env;
const port = PORT || 21000;

app.use(helmet());
app.use(express.json());
app.use(cors());

// Import routes
const login = require("../backend/routes/login");
const register = require("../backend/routes/register");

// Use routes
app.use("/auth/v1/login", login);
app.use("/auth/v1/register", register);

app.get("*", (req, res) => {
  res.status(403).send({
    error: `Method ${req.method} not allowed`,
  });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
