import { Link } from "react-router-dom";
import "../assets/scss/navbar.scss";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import user_icon from "../assets/icons/user.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="nav">
      <Link to="/" className="link">
        <h1>NOTO</h1>
      </Link>
      {user && (
        <div className="logged-in">
          <div className="email">{user.email}</div>
          <Tippy
            content={
              <span style={{ color: "white", letterSpacing: "1.5px" }}>
                Logout
              </span>
            }
          >
            <img src={user_icon} alt="user icon" onClick={handleClick} />
          </Tippy>
        </div>
      )}
      {!user && (
        <div className="opts">
          <Link to="/login" className="link">
            <div>LOGIN</div>
          </Link>
          <Link to="/signup" className="link">
            <div>SIGNUP</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
