import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import login from "../utils/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      navigate("/dashboard", { state: { user: userData, token } });
    }
  }, [userData, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(
      email,
      password,
      setUserData,
      setToken,
      setError,
      setErrorMessage
    );
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login</h1>
      {error && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <p className="mt-3">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
