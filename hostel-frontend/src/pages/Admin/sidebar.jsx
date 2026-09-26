import "./admin.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();  // ✅ FIXED

  return (
    <div className="sidebar">
      <h2>Hostel Admin</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/students">Students</Link>
      <Link to="/admin/rooms">Rooms</Link>
      <Link to="/admin/complaints">Complaints</Link>
      {/* <Link to="/admin/caretakers">Caretakers</Link> */}
      <Link to="/admin/reports">Reports</Link>
      {/* <Link to="/admin/settings">Settings</Link> */}
      <Link to="/">Logout</Link>

      {/* OPTIONAL — if you want a clickable LI instead of Link */}
      
    </div>
  );
};

export default Sidebar;
