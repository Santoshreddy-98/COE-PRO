import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./DA.css";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,

        password,
      });

      const { role } = response.data; // Assuming the role is present in the response data

      console.log(response.data); // Handle the response data as needed

      // Redirect to the desired page after successful login

      navigate("/checklist", { state: { role } });
    } catch (error) {
      setError("Invalid username or password");

      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">PD-dev PD-Lead</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          className="login-input"
        />

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="login-input"
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
