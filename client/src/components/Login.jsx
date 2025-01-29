import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// const baseURL = 'http://localhost:8000';
const baseURL = "https://zesmo-task.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/users/login`, { email, password });
      console.log("Login Response:", response.data);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
      <h2 className="text-center">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <h6 className="mt-2">New User? <Link to='/register'> Register here!</Link></h6>
      </form>
    </div>
  );
};

export default Login;