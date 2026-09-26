import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* 🌐 Navbar */}
      <nav className="navbar">
        <div className="logo">Hostel HelpDesk</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>

          {/* LOGIN BUTTON THAT NAVIGATES */}
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </ul>
      </nav>

      {/* 🏠 Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to <span>Hostel HelpDesk</span></h1>
          <p>
            A smarter way to manage hostel complaints and maintenance.  
            Quick. Transparent. Reliable.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* 💡 Features Section */}
      <section className="features" id="features">
        <h2>Our Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🧾 Complaint Tracking</h3>
            <p>Students can register and track issues in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Admin Dashboard</h3>
            <p>Admins can monitor, assign, and manage all tasks efficiently.</p>
          </div>
          <div className="feature-card">
            <h3>🔔 Smart Notifications</h3>
            <p>Get instant updates when a task is resolved or assigned.</p>
          </div>
        </div>
      </section>

      {/* 🧭 About Section */}
      <section className="about" id="about">
        <h2>About Hostel HelpDesk</h2>
        <p>
          Hostel HelpDesk is your centralized solution for all hostel-related
          issues. Whether you’re a student, admin, or staff member — our platform
          ensures communication is seamless and efficient.
        </p>
      </section>

      {/* 📞 Footer */}
      <footer id="contact">
        <p>© 2025 Hostel HelpDesk | Designed for Better Hostel Living</p>
      </footer>
    </div>
  );
};

export default Home;
