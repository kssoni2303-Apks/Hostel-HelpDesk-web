import React, { useState } from "react";
import "./signup.css";
import { useParams, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { role = "student" } = useParams();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("❌ " + (result.message || "Invalid email or password."));
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      if (result.user.role === "Helper") {
        localStorage.setItem("workerId", String(result.user.id));
        localStorage.setItem("workerName", result.user.full_name || result.user.name || "Worker");
      }

      alert("Login Successful! Welcome " + (result.user.full_name || result.user.name || "User"));

      const userRole = String(result.user.role || "").toLowerCase();

      if (userRole === "admin" || userRole === "caretaker") {
        navigate("/admin/dashboard");
      } else if (userRole === "student") {
        navigate("/student/homesec");
      } else if (userRole === "helper") {
        navigate("/helper/dashboard");
      } else {
        alert("Login succeeded, but this account has no supported role.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("🚀 Server connection failed. Please make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="bubbles">
        {[...Array(5)].map((_, i) => <div key={i} className="bubble"></div>)}
      </div>

      <div className="signup-container">
        <h2 className="title">Hostel HelpDesk</h2>
        <h3 className="heading">Login</h3>
        <p className="welcome-text">
          Login as <b>{role.charAt(0).toUpperCase() + role.slice(1)}</b>
        </p>

        <form className="signup-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input name="email" type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input name="password" type="password" placeholder="Enter your password" required />

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-text">
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
