import { useEffect, useState } from "react";
import {
  Container,
  Alert,
  Card,
  Table,
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Tasks = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const token = location.state?.token;
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = userData !== undefined;

  // State for tasks
  const [userTasks, setUserTasks] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    fetchTasks();
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:15000/auth/v1/task/view",
        "",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      setUserTasks(response.data.tasks);
    } catch (error) {
      setError(true);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Failed to fetch tasks."
        );
      } else if (error.request) {
        setErrorMessage("Network error. Please try again later.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard", { state: { user: userData, token } });
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleDismiss = () => {
    setError(false);
    setSuccessMessage("");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost:15000/auth/v1/task/delete",
        {
          taskId: selectedTask._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
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
      console.log(error);
    }
    setShowDeleteModal(false);
  };

  const handleEdit = async () => {
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
            Authorization: `Bearer ${token.token}`,
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
      console.log(error);
    }
    setShowEditModal(false);
  };

  return (
    <Container className="mt-5">
      {isAuthenticated ? (
        <>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Task Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link onClick={goToDashboard}>Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1 className="mb-4">Tasks of {userData.username}!</h1>
          <hr />
          {error && (
            <Alert variant="danger" onClose={handleDismiss} dismissible>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" onClose={handleDismiss} dismissible>
              {successMessage}
            </Alert>
          )}
          <Card className="mb-4">
            <Card.Header>Tasks</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.dueDate).toLocaleString()}</td>
                      <td>{task.priority}</td>
                      <td>{task.category}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedTask(task);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setSelectedTask(task);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Alert variant="danger">
          You are not authenticated. Please log in.
        </Alert>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                defaultValue={selectedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                defaultValue={selectedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={selectedTask.dueDate}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTaskCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task category"
                defaultValue={selectedTask.category}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, category: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tasks;
