import React, { useEffect, useState } from "react";
import "../Admin/admin.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students/all-students");
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || data.message || "Failed to load students");
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="admin-content">
      <div className="student-header">
        <h2 className="page-title">Student List</h2>
      </div>

      {error && <p>{error}</p>}

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hostel Type</th>
            <th>Hostel Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>

        <tbody>
          {students.length ? students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.full_name}</td>
              <td>{student.hostel_type || "N/A"}</td>
              <td>{student.hostel_name || "N/A"}</td>
              <td>{student.phone_number || "N/A"}</td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
