import React, { useEffect, useState } from "react";
import "../Admin/admin.css";

const PendingComplaints = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPending = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/pending");
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Failed to load pending complaints");
        setPending(result.data || []);
      } catch (error) {
        console.error("Pending complaints error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPending();
  }, []);

  return (
    <div className="admin-content">
      <h2 className="page-title">Pending Complaints</h2>

      {loading ? <p>Loading pending complaints...</p> : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Room</th>
              <th>Issue</th>
              <th>Reported</th>
            </tr>
          </thead>

          <tbody>
            {pending.length ? pending.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.student_name}</td>
                <td>{p.room || "N/A"}</td>
                <td>{p.title}</td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: "center" }}>No pending complaints.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingComplaints;
