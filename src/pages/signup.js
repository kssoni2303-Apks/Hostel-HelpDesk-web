import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [role, setRole] = useState("Student");

  return (
    <div className="signup-page">
      {/* Animated background bubbles */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      {/* Signup card */}
      <div className="signup-container">
        <h1 className="site-title">Hostel HelpDesk</h1>
        <h2>Signup</h2>
        <p>Welcome! Please fill in your details to create an account.</p>

        <form className="signup-form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Phone Number</label>
          <input type="text" placeholder="Enter your phone number" />

          <label>Room</label>
          <input type="text" placeholder="Enter your Room" />

          <label>Block ID</label>
          <input type="text" placeholder="Enter your Block ID" />

          <label>USN</label>
          <input type="text" placeholder="Enter your USN" />

          <label>Role</label>
          <div className="role-buttons">
            {["Caretaker", "Helper", "Student"].map((r) => (
              <button
                type="button"
                key={r}
                className={role === r ? "active" : ""}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit" className="submit-btn">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <a href="#">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
