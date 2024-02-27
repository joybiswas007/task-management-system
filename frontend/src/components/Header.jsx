import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Task Manager
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/tasks" className="nav-link">
                  Tasks
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
