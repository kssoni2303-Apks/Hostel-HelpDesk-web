import React from "react";
import "./loginsections.css";
import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <h1 className="title">Hostel HelpDesk</h1>
      <h2 className="subtitle">Login As</h2>

      <div className="card-wrapper">

        {/* ADMIN */}
        <div className="login-card" onClick={() => navigate("/login/admin")}>
          <i className="fas fa-user-shield icon"></i>
          <h3>Admin / Warden</h3>
          <p>Access dashboard & manage hostel activities</p>
        </div>

        {/* STUDENT */}
        <div className="login-card" onClick={() => navigate("/login/student")}>
          <i className="fas fa-user-graduate icon"></i>
          <h3>Student</h3>
          <p>Register & track your complaints</p>
        </div>

        {/* WORKER */}
        <div className="login-card" onClick={() => navigate("/login/helper")}>
          <i className="fas fa-tools icon"></i>
          <h3>Worker / Helper</h3>
          <p>View assigned tasks & update status</p>
        </div>

      </div>
    </div>
  );
};

export default LoginSelection;
