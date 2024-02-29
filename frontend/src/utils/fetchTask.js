import axios from "axios";

const fetchTask = async (token, setUserTasks, setError, setErrorMessage) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/task/view",
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserTasks(response.data.tasks);
  } catch (error) {
    console.error(error.message);
    setError(true);
    if (error.response) {
      setErrorMessage(error.response.data.message || "Failed to fetch tasks.");
    } else if (error.request) {
      setErrorMessage("Network error. Please try again later.");
    } else {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }
};

export default fetchTask;
