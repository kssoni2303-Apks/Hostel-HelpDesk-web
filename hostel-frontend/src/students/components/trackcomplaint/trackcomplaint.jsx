import React, { useState } from "react";
import "./trackcomplaint.css";

const TrackComplaint = () => {
  const [complaintID, setComplaintID] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Fetch data from your backend
      const response = await fetch(`http://localhost:5000/api/complaints/track/${complaintID}`);
      
      if (!response.ok) {
        throw new Error("Complaint ID not found");
      }

      const dbData = await response.json();

      // 2. Map the DB status to your UI steps
      // Logic: If status is 'Resolved', all steps are done. If 'In Progress', some are done.
      const mappedStatus = {
        id: dbData.id,
        currentStatus: dbData.status,
        steps: [
          { step: "Complaint Submitted", done: true }, // Always true if ID exists
          { step: "Assigned to Worker", done: dbData.status === "In-Progress" || dbData.status === "Completed" },
          { step: "Worker Visit Scheduled", done: dbData.status === "In-Progress" || dbData.status === "Completed" },
          { step: "Issue Resolved", done: dbData.status === "Completed" },
        ]
      };

      setStatusData(mappedStatus);
    } catch (err) {
      alert(err.message);
      setStatusData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-container">
      <h2>Track Your Complaint</h2>

      <form className="track-form" onSubmit={handleTrack}>
        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={complaintID}
          onChange={(e) => setComplaintID(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {statusData && (
        <div className="status-box">
          <h3>Complaint ID: {statusData.id}</h3>
          <h4>Current Status: <span className={`status-text ${statusData.currentStatus}`}>{statusData.currentStatus}</span></h4>

          <div className="progress-steps">
            {statusData.steps.map((item, index) => (
              <div
                key={index}
                className={`step ${item.done ? "done" : ""}`}
              >
                <div className="step-circle">{item.done ? "✓" : index + 1}</div>
                <span>{item.step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;