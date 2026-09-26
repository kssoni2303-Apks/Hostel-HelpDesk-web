import React from "react";
import { Link } from "react-router-dom";

export default function WorkerNavbar() {
  const logout = () => {
    // Clear all worker related data
    localStorage.removeItem("workerToken");
    localStorage.removeItem("workerName");
    localStorage.removeItem("workerId");
    localStorage.removeItem("user");
    // window.location.href = "/worker/login";
    window.location.href = "/";
  };

  return (
    <div className="worker-navbar" style={{ background: "#333", color: "#fff", padding: "10px", display: "flex", justifyContent: "space-between" }}>
      <div className="worker-navbar-title">🏠 Hostel HelpDesk — Worker</div>

      <div className="worker-navbar-links" style={{ display: "flex", gap: "15px" }}>
        <Link to="/helper/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/helper/assigned" style={{ color: "white", textDecoration: "none" }}>Assigned</Link>
        <Link to="/helper/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
        

        <button 
          className="logout-btn" 
          onClick={logout} Link to="./pages/home"
          style={{ background: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}