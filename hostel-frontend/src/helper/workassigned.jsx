import React, { useEffect, useState } from "react";
import WorkerNavbar from "../helper/helpernavbar";

export default function WorkerAssigned() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const workerId = user?.id || localStorage.getItem("workerId");

  const fetchAssigned = async () => {
    if (!workerId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/worker/assigned/${workerId}`);
      const resData = await response.json();

      if (!response.ok) throw new Error(resData.error || resData.message || "Failed to load assigned complaints");
      setComplaints(resData.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssigned();
  }, [workerId]);

  const updateStatus = async (id, newStatus) => {
    const oldComplaints = complaints;
    setComplaints(complaints.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    ));

    try {
      const response = await fetch(`http://localhost:5000/worker/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setComplaints(oldComplaints);
        alert("Failed to update status on server.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      setComplaints(oldComplaints);
      alert("Connection error. Check if backend is running.");
    }
  };

  return (
    <>
      <WorkerNavbar />
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "30px",
        background: "#edeee2ff"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Assigned Complaints</h2>

        {loading ? <p>Loading assigned complaints...</p> :
          complaints.length === 0 ? <p>No complaints assigned yet.</p> :
          <div style={{
            width: "90%", maxWidth: "900px", display: "flex",
            flexDirection: "column", gap: "20px"
          }}>
            {complaints.map((item) => (
              <div key={item.id} style={{
                background: "white", padding: "20px", borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}>
                <h3>{item.title} Complaint</h3>
                <p><b>Room:</b> {item.room || "N/A"}</p>
                <p><b>Description:</b> {item.description}</p>
                <p><b>Student:</b> {item.student_name}</p>
                <p><b>Date:</b> {new Date(item.created_at).toLocaleDateString()}</p>
                <p><b>Status:</b> {item.status}</p>

                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  style={{
                    marginTop: "10px", padding: "8px", borderRadius: "5px",
                    border: "1px solid #aaa", width: "150px"
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}
