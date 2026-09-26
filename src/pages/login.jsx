import React from "react";
import "./signup.css"; // Same CSS file as signup page

const Login = () => {
  return (
    <div className="signup-page">
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="signup-container">
        <h2 className="title">Hostel HelpDesk</h2>
        <h3 className="heading">Login</h3>
        <p className="welcome-text">Welcome back! Please sign in to your account.</p>

        <form className="signup-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit" className="signup-btn">Login</button>
        </form>

        <p className="login-text">
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
