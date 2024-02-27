import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Task Manager</h5>
            <p>A simple task management application</p>
          </Col>
          {/* <Col md={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/dashboard" className="text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="text-white">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white">
                  About
                </Link>
              </li>
            </ul>
          </Col> */}
          <Col md={3}>
            <h5>Contact</h5>
            <p>Email: joybiswas040701@gmail.com</p>
            <p>Phone: 123-456-7890</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="text-center">&copy; {year} Joy Biswas</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
