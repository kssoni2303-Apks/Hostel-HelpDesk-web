import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const [role, setRole] = useState("Student");
  const [post, setPost] = useState("Electrician");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      full_name: e.target.fullName.value.trim(),
      email: e.target.email.value.trim(),
      phone_number: e.target.phone.value.trim(),
      hostel_type: e.target.hostelType.value,
      hostel_name: e.target.hostelName.value.trim(),
      registration_number: e.target.regNum.value.trim(),
      role,
      post,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("❌ Failed: " + (result.message || "Something went wrong"));
        return;
      }

      alert("🎉 " + result.message);
      navigate(role.toLowerCase() === "helper" ? "/login/helper" : "/login/student");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("🚀 Server connection failed. Check if your backend is running!");
    }
  };

  return (
    <div className="signup-page">
      <div className="bubbles">
        {[...Array(10)].map((_, i) => <div key={i} className="bubble"></div>)}
      </div>

      <div className="signup-container">
        <h1 className="site-title">Hostel HelpDesk</h1>
        <h2>Signup</h2>
        <p>Welcome! Please fill in your details to create an account.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="fullName" type="text" placeholder="Enter your full name" required />

          <label>Email</label>
          <input name="email" type="email" placeholder="Enter your email" required />

          <label>Phone Number</label>
          <input name="phone" type="text" placeholder="Enter your phone number" required />

          <label>Hostel type</label>
          <input name="hostelType" type="text" placeholder="Enter your Hostel type" required />

          <label>Hostel name</label>
          <input name="hostelName" type="text" placeholder="Enter your Hostel name" required />

          <label>Registration Number</label>
          <input name="regNum" type="text" placeholder="Enter your Registration Number" />

          <label>Role</label>
          <div className="role-buttons">
            {["Helper", "Student"].map((r) => (
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

          {role === "Helper" && (
            <>
              <label>Work Category</label>
              <select name="post" value={post} onChange={(e) => setPost(e.target.value)}>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Cleaner">Cleaner</option>
              </select>
            </>
          )}

          <label>Password</label>
          <input name="password" type="password" placeholder="Enter your password" required />

          <button type="submit" className="submit-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <a href="/login/student">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
