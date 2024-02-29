import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:15000/auth/v1/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.statusCode === 200) {
        setUserData(response.data.user);
        setToken(response.data.token);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        setError(true);
        setErrorMessage("Invalid email or password");
      } else {
        setError(true);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
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
        </div>
      </Form>
    </Container>
  );
};

export default Login;
