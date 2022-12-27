import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/signup.scss";
import logo from "../assets/icons/logo.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="box">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>NOTO</h2>
          <div className="slogan">NOTABLY MINIMAL NOTES.</div>
        </div>

        <div className="form-fields">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="EMAIL ADDRESS"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="PASSWORD"
          />

          <button>SIGNUP</button>
          <div className="footer">
            <div>ALREADY HAVE AN ACCOUNT?</div>
            <Link to="/login">LOGIN TO ACCOUNT</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
