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
const login = require("./routes/login");
const register = require("./routes/register");
const addTask = require("./routes/tasks/addTask");
const tasks = require("./routes/tasks/tasks");
const editTask = require("./routes/tasks/editTask");
const deleteTask = require("./routes/tasks/deleteTask");

// Use routes
app.use("/auth/v1/login", login);
app.use("/auth/v1/register", register);
app.use("/auth/v1/task/add", addTask);
app.use("/auth/v1/task/view", tasks);
app.use("/auth/v1/task/edit", editTask);
app.use("/auth/v1/task/delete", deleteTask);

app.get("*", (req, res) => {
  res.status(403).send({
    error: `Method ${req.method} not allowed`,
  });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
