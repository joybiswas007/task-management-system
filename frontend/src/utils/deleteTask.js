import axios from "axios";

const deleteTask = async (
  selectedTask,
  token,
  setSuccessMessage,
  setError,
  setErrorMessage,
  setShowDeleteModal
) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/task/delete",
      {
        taskId: selectedTask._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.statusCode === 202) {
      setSuccessMessage("Task deleted successfully");
    } else {
      setError(true);
      setErrorMessage("Failed to delete task. Please try again later.");
    }
  } catch (error) {
    setError(true);
    setErrorMessage("An error occurred while deleting the task.");
    console.error(error);
  }
  setShowDeleteModal(false);
};

export default deleteTask;
