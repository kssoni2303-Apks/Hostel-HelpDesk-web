import React, { useEffect, useState } from "react";
import WorkerNavbar from "./helpernavbar";

export default function WorkerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const workerId = user?.id || localStorage.getItem("workerId");
  const name = user?.full_name || user?.name || localStorage.getItem("workerName") || "Worker";

  const [stats, setStats] = useState({ assigned: 0, completed: 0, pending: 0 });

  useEffect(() => {
    if (!workerId) return;

    fetch(`http://localhost:5000/worker/stats/${workerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats({
            assigned: data.assigned,
            completed: data.completed,
            pending: data.pending
          });
        }
      })
      .catch((err) => console.error("Worker stats error:", err));
  }, [workerId]);

  return (
    <>
      <WorkerNavbar />

      <div style={{
        minHeight: "calc(100vh - 60px)",
        backgroundImage: "url('https://th.bing.com/th/id/R.397e308e3293b4bf741516977a056092?rik=%2bdtq8vwQEpEiAA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1258853%2fimages%2fo-CANADA-TEMPORARY-WORKERS-facebook.jpg&ehk=2%2fsbfNlBhUOeUGrGc%2fvH5no2n7QDY7wcgydXuetulz4%3d&risl=&pid=ImgRaw&r=0')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", justifyContent: "center", alignItems: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0, backdropFilter: "blur(4px)",
          background: "rgba(10, 0, 0, 0.4)"
        }} />

        <div style={{
          position: "relative", zIndex: 10, color: "white",
          textAlign: "center", width: "70%", padding: "30px"
        }}>
          <h2>Welcome, {name} 👋</h2>
          <p>This is your worker dashboard.</p>

          <table style={{
            width: "100%", marginTop: "30px", borderCollapse: "collapse",
            fontSize: "18px"
          }}>
            <tbody>
              <tr>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>Assigned Complaints</td>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>{stats.assigned}</td>
              </tr>
              <tr>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>Completed Complaints</td>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>{stats.completed}</td>
              </tr>
              <tr>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>Pending Tasks</td>
                <td style={{ border: "3px solid #fff", padding: "12px" }}>{stats.pending}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
