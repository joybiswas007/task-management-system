import { useEffect, useState } from "react";
import { Container, Alert, Card, Table, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Tasks = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const tokens = location.state?.tokens;
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = userData !== undefined;

  // State for tasks
  const [userTasks, setUserTasks] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  });

  console.log(userTasks);
  console.log(tokens.tokens[0].token);

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:15000/auth/v1/tasks",
        "",
        {
          headers: {
            Authorization: `Bearer ${tokens.tokens[0].token}`,
          },
        }
      );
      setUserTasks(response.data.tasks);
    } catch (error) {
      setError(true);
      setErrorMessage("Failed to fetch tasks.");
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard", { state: { user: userData, tokens: tokens } });
  };

  const handleLogout = () => {
    console.log("Logout");
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
                <Nav.Link onClick={goToDashboard}>Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1 className="mb-4">Welcome to Dashboard, {userData.username}!</h1>
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
                  </tr>
                </thead>
                <tbody>
                  {userTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>{task.category}</td>
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
    </Container>
  );
};

export default Tasks;
