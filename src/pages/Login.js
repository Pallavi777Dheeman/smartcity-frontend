import { useState } from "react";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      if (!err.response) {
        alert(
          "Backend server is waking up (free tier). Please wait 10–15 seconds and click Login again.\n\nLive demo may take time. For code details, check GitHub."
        );
      } else {
        alert(err.response.data.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

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

      <button onClick={login} disabled={loading}>
        {loading ? "Please wait..." : "Login"}
      </button>

      <p style={{ fontSize: "12px", color: "#666", textAlign: "center" }}>
        Note: Backend is hosted on Render free tier and may take a few seconds to respond.
      </p>
    </div>
  );
}

export default Login;
