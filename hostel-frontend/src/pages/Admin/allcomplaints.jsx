import React, { useEffect, useState } from "react";
import "../Admin/admin.css";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/all");
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Failed to load complaints");
        setComplaints(result.data || []);
      } catch (error) {
        console.error("All complaints error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  return (
    <div className="admin-content">
      <h2 className="page-title">All Complaints</h2>

      {loading ? <p>Loading complaints...</p> : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Room</th>
              <th>Issue</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length ? complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.student_name}</td>
                <td>{c.room || "N/A"}</td>
                <td>{c.title}</td>
                <td>
                  <span className={
                    c.status === "Pending" ? "status-pending" :
                    c.status === "Completed" ? "status-resolved" : "status-pending"
                  }>
                    {c.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: "center" }}>No complaints found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllComplaints;
