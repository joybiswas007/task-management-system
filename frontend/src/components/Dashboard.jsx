import { useState } from "react";
import {
  Container,
  Alert,
  Form,
  Button,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import addTask from "../utils/addTask";
import logout from "../utils/logout";

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const token = location.state?.token;

  // Check if user is authenticated
  const isAuthenticated = userData !== undefined;

  // State for task creation form
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    await addTask(
      userData,
      task,
      token.token,
      setSuccessMessage,
      setError,
      setErrorMessage
    );
  };

  const handleViewTasks = () => {
    navigate("/tasks", { state: { user: userData, token } });
  };

  const handleLogout = async () => {
    const response = await logout(token.token);
    if (response) {
      navigate("/");
    }
  };

  const handleDismiss = () => {
    setError(false);
    setSuccessMessage("");
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
                <Nav.Link onClick={handleViewTasks}>View Tasks</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1 className="mb-4">Welcome to Dashboard, {userData.username}!</h1>
          <p className="mb-4">Email: {userData.email}</p>
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
            <Card.Header>Create New Task</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateTask}>
                <Form.Group controlId="taskTitle">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={task.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="taskDescription">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter task description"
                    value={task.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="taskDueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="taskPriority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    name="priority"
                    value={task.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="taskCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    placeholder="Enter task category"
                    value={task.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Create Task
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Alert variant="danger">
          You are not authenticated. Please log in.
        </Alert>
      )}
    </Container>
  );
};

export default Dashboard;
