import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/scss/navbar.scss";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import user_icon from "../assets/icons/user.png";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [hover, isHover] = useState(false);
  const { login } = useLogin();

  const handleClick = () => {
    isHover(false);
    logout();
  };

  // login to demo account
  const demoClick = async (e) => {
    e.preventDefault();
    await login("demo@gmail.com", "demopass");
    /*
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("https://noto-server.cyclic.app/api/notes", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }); */
  };

  return (
    <div className="nav">
      <Link to="/" className="link">
        <h1>NOTO</h1>
      </Link>
      {user && (
        <div className="logged-in">
          {hover && (
            <motion.div initial={{ x: 8 }} animate={{ x: 0 }} className="email">
              {user.email}
            </motion.div>
          )}
          <Tippy
            content={
              <span style={{ color: "white", letterSpacing: "1px" }}>
                Logout
              </span>
            }
          >
            <img
              onClick={handleClick}
              onMouseOver={() => {
                isHover(true);
              }}
              onMouseOut={() => {
                isHover(false);
              }}
              src={user_icon}
              alt="user icon"
            />
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
          <div onClick={demoClick} className="demo-link">
            DEMO
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
