import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Task Manager
        </Link>
      </div>
    </header>
  );
};

export default Header;
