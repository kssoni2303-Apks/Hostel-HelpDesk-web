import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./sidebar";
import Navbar from "./navbar";
import StatsCard from "./statscard";
import RecentComplaints from "./recentcomplaints";
import "./admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // ✅ FIX 1: Define the 'stats' state and 'setStats' function
  const [stats, setStats] = useState({
    students: 0,
    totalComplaints: 0,
    pendingComplaints: 0
  });

  // ✅ FIX 2: Ensure the function name matches what you call at the bottom
  const fetchDashboardData = async () => {
    try {
      const studentRes = await fetch("http://localhost:5000/api/students/count"); 
      const studentData = await studentRes.json();

      const complaintRes = await fetch("http://localhost:5000/api/complaints/stats");
      const complaintData = await complaintRes.json();

      if (studentData.success && complaintData.success) {
        setStats({
          students: studentData.count,
          totalComplaints: complaintData.total,
          pendingComplaints: complaintData.pending
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // ✅ FIX 3: Call the correct function name
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Navbar />

        <div className="cards-container">
          <StatsCard
            title="Total Students"
            value={stats.students} // ✅ Using stats object
            onClick={() => navigate("/admin/students")}
          />

          <StatsCard
            title="Total Complaints"
            value={stats.totalComplaints} // ✅ Using stats object
            onClick={() => navigate("/admin/complaints")}
          />

          <StatsCard
            title="Pending Complaints"
            value={stats.pendingComplaints} // ✅ Using stats object
            onClick={() => navigate("/admin/complaints/pending")}
          />
        </div>

        <RecentComplaints />
      </div>
    </div>
  );
};

export default AdminDashboard;