import { Link } from "react-router-dom";
import "../assets/scss/navbar.scss";

function Navbar() {
  return (
    <div className="nav">
      <Link to="/" className="link">
        <h1>NOTO</h1>
      </Link>
      <div className="opts">
        <Link to="/login" className="link">
          <div>Login</div>
        </Link>
        <Link to="/signup" className="link">
          <div>Sign-up</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
