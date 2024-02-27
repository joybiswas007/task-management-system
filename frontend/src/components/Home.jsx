import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Welcome to Task Manager</h2>
        <p className="text-center mb-4">Manage your tasks with ease.</p>
        <div className="d-flex justify-content-center">
          <Link to="/login" className="btn btn-primary me-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Home;
