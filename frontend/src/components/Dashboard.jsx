import { Container, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  // Check if user is authenticated
  const isAuthenticated = userData !== undefined;

  return (
    <Container className="mt-5">
      {isAuthenticated ? (
        <>
          <h1>Welcome to Dashboard</h1>
          <p>User: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Add more dashboard content here */}
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
