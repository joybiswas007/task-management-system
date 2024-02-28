import { Container, Alert, Form, Button, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.user;
  // const tokens = location.state?.tokens;

  // Check if user is authenticated
  const isAuthenticated = userData !== undefined;

  const handleCreateTask = () => {
    // Implement create task functionality
  };

  const handleViewTasks = () => {
    // Implement view tasks functionality
  };

  return (
    <Container className="mt-5">
      {isAuthenticated ? (
        <>
          <h1>Welcome to Dashboard, {userData.username}!</h1>
          <p>Email: {userData.email}</p>
          <hr />
          <h2>Create New Task</h2>
          <Form>
            <Form.Group as={Row} controlId="taskName">
              <Form.Label column sm={2}>
                Task Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Enter task name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="taskDescription">
              <Form.Label column sm={2}>
                Task Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter task description"
                />
              </Col>
            </Form.Group>
            <Button variant="primary" onClick={handleCreateTask}>
              Create Task
            </Button>
          </Form>
          <hr />
          <h2>View Tasks</h2>
          {/* Add task list component or table to view tasks */}
          <Button variant="success" onClick={handleViewTasks}>
            View Tasks
          </Button>
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
