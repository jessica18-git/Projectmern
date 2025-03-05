import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Login</h2>
      <div className="d-flex flex-column align-items-center">
        <input
          type="email"
          placeholder="Email"
          className="form-control w-25 mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control w-25 mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
