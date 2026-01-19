import { useState } from "react";
import API from "../api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      await API.post("/register", { email, password });
      alert("Registration successful. Please login.");
      window.location.href = "/";
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register} disabled={loading}>
        {loading ? "Please wait..." : "Register"}
      </button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#3498db", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
