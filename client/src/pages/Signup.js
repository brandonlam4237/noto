import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import "../assets/scss/signup.scss";
import logo from "../assets/icons/logo.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  // on page load wakeup server and clean up demo notes(just in case)
  useEffect(() => {
    async function wakeUp() {
      const res = await fetch("https://noto-server.cyclic.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@gmail.com", password: "demopass" }),
      });
      const json = await res.json();
      await fetch("https://noto-server.cyclic.app/api/notes", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${json.token}`,
        },
      });
    }
    wakeUp();
  }, []);

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

          <button disabled={isLoading}>SIGNUP</button>
          {error && <div className="error">{error}</div>}

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
