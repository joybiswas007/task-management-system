// import { useState } from "react";
// import { Form, Button, Container, Alert } from "react-bootstrap";
// import { Link, redirect } from "react-router-dom";
// import register from "../utils/register";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const regiserSuccess = await register(
//       username,
//       email,
//       password,
//       confirmPassword,
//       redirect,
//       setError,
//       setErrorMessage
//     );
//     if (regiserSuccess) {
//       setSuccessMessage("Registration successfull");
//     }
//   };

//   const handleClear = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="mb-4">Register</h1>
//       {error && <Alert variant="danger">{errorMessage}</Alert>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username" className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="email" className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="password" className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" className="mb-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="d-grid gap-2">
//           <Button variant="primary" type="submit">
//             Register
//           </Button>
//           <Button variant="secondary" onClick={handleClear}>
//             Clear
//           </Button>
//           <p className="mt-3">
//             Already registered? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Register;

import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";
import register from "../utils/register";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regiserSuccess = await register(
      username,
      email,
      password,
      confirmPassword,
      redirect,
      setError,
      setErrorMessage
    );
    if (regiserSuccess) {
      setSuccessMessage("Registration successful");
    }
  };

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Register</h1>
      {error && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <p className="mt-3">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
