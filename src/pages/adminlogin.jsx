import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";

const BASE_URL = "https://event-registration-backend-1.onrender.com";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/login`,
        credentials
      );

      if (response.data.success) {
        // Save JWT token
        localStorage.setItem("adminToken", response.data.token);

        // Save username (optional)
        localStorage.setItem("adminUsername", response.data.username);

        // Redirect
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
