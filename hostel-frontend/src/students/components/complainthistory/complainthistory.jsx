import React, { useEffect, useState } from "react";
import "./complainthistory.css";

const ComplaintHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const loadHistory = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/complaints/history/${user.id}`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Failed to load history");
        setHistoryData(result.data || []);
      } catch (error) {
        console.error("History Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Your Complaint History</h2>

      {loading ? (
        <p>Loading complaint history...</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Date</th>
              <th>Issue</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {historyData.length ? historyData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{item.title}</td>
                <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No complaints submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintHistory;
