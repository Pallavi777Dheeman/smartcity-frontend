import { useState } from "react";
import API from "../api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await API.post("/register", { email, password });
    alert("Registered successfully");
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Register</h2>

      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
