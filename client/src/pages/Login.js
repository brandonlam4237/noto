import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/login.scss";
import logo from "../assets/icons/logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
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

          <button>LOGIN</button>
          <div className="footer">
            <div>DON'T HAVE AN ACCOUNT?</div>
            <Link to="/signup">CREATE ACCOUNT</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
