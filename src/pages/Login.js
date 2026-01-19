import { useState } from "react";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  try {
    const res = await API.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  } catch (err) {
    if (!err.response) {
      alert(
        "Server is waking up (Render free tier). Please wait 10–15 seconds and click Login again.\n\nFor code details, check GitHub."
      );
    } else {
      alert(err.response.data.message || "Login failed");
    }
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

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
