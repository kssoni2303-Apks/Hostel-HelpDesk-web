import React, { useEffect, useState } from "react";
import "./admin.css";

const RecentComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/recent");
        const result = await response.json();

        if (response.ok && result.success) {
          setComplaints(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch recent complaints:", err);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="table-box">
      <h3>Recent Complaints</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.student_name}</td>
                <td>{c.title}</td>
                <td className={
                  c.status === "Completed" ? "success" :
                  c.status === "In-Progress" ? "warning" : "pending"
                }>
                  {c.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No recent complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentComplaints;
