import { useState, useEffect } from "react";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waking, setWaking] = useState(true);

  // Wake up backend when page loads
  useEffect(() => {
    API.get("/health")
      .catch(() => {})
      .finally(() => setWaking(false));
  }, []);

  const login = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      if (!err.response) {
        alert(
          "Backend server is waking up (free tier). Please wait 10–15 seconds and try again.\n\nFor full implementation details, check GitHub."
        );
      } else {
        alert(err.response.data.message || "Login failed");
      }
    }
  };

  if (waking) {
    return (
      <div className="container">
        <h2>Waking up server…</h2>
        <p>Please wait a few seconds</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
