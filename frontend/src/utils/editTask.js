import axios from "axios";

const editTask = async (
  selectedTask,
  editedTask,
  token,
  setSuccessMessage,
  setError,
  setErrorMessage,
  setShowEditModal
) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/task/edit",
      {
        taskId: selectedTask._id,
        title: editedTask.title,
        description: editedTask.description,
        dueDate: editedTask.dueDate,
        priority: editedTask.priority,
        category: editedTask.category,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.statusCode === 202) {
      setSuccessMessage("Task edited successfully");
    } else {
      setError(true);
      setErrorMessage("Failed to edit task. Please try again later.");
    }
  } catch (error) {
    setError(true);
    setErrorMessage("An error occurred while editing the task.");
    console.error(error);
  }
  setShowEditModal(false);
};

export default editTask;
