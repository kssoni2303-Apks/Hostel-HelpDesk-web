import React from 'react';
// import { Link, Navigate } from 'react-router-dom'; 
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate here
import './navbar.css';
import logo from '../../images/logo.jpg';


const Navbar = () => {  // ✅ Function wrapper starts here
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logged out!");
    navigate ('/');
  };

  return (   // ✅ Return inside the function
    <div className='navbar'>
      <img src={logo} alt="Logo" className='logo' />
      
      <ul>
        <li><Link to="/student/homesec">Home</Link></li>
        <li><Link to="/students/fileComplaint">File Complaint</Link></li>
        <li><Link to="/students/track">Track Complaint</Link></li>
        <li><Link to="/students/history">Complaint History</Link></li>
      </ul>

      <div className='log-out'>
        <button onClick={handleLogout}
        >Log-Out</button>
      </div>

      <div className='profile'>
        
        <Link to="/students/profile">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;