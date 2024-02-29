import axios from "axios";

const addTask = async (
  userData,
  task,
  token,
  setSuccessMessage,
  setError,
  setErrorMessage
) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/task/add",
      {
        userId: userData._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        category: task.category,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.statusCode === 200) {
      setSuccessMessage("Task added successfully");
      setError(false);
    }
  } catch (error) {
    console.error(error.message);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 404)
    ) {
      setError(true);
      setErrorMessage("You're not authorized to post.");
    } else {
      setError(true);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }
};

export default addTask;
