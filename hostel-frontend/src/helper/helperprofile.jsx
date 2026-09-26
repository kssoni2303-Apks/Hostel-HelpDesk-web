import React, { useEffect, useState } from "react";
import WorkerNavbar from "../helper/helpernavbar";
import "./helper.css";
export default function WorkerProfile() {
  const workerId = localStorage.getItem("workerId"); 

  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    sex: "",
    experience: "",
    post: "",
  });

  // 🔹 FETCH PROFILE using fetch
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/worker/profile/${workerId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const resData = await response.json();

        if (resData.success) {
          setProfile(resData.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    if (workerId) {
      loadProfile();
    }
  }, [workerId]);

  // 🔹 UPDATE PROFILE using fetch
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/worker/update-profile/${workerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Update request failed");
      }

      const resData = await response.json();

      if (resData.success) {
        setMsg("Profile updated successfully!");
        localStorage.setItem("workerName", profile.name);
        setEditing(false);
      }
    } catch (err) {
      console.error("Update Error:", err);
      setMsg("Update failed, try again.");
    }
  };

  return (
    <>
      <WorkerNavbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <div style={{ width: "60%", position: "relative" }}>

          {/* Edit Button */}
          <button
            onClick={() => setEditing(!editing)}
            style={{
              position: "absolute",
              right: "0px",
              top: "0px",
              padding: "8px 15px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Worker Profile
          </h2>

          <div style={{ textAlign: "center" }}>
            <div className="profile-pic-circle">
              <img
                src="https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                alt="profile"
              />
            </div>
            <p style={{ letterSpacing: "1px", fontWeight: "bold" }}>
              {profile.name}
            </p>
          </div>

          <div
            style={{
              marginTop: "25px",
              padding: "25px",
              border: "2px solid black",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
              Personal Details
            </h3>

            {/* VIEW MODE */}
            {!editing && (
              <div style={{ lineHeight: "2" }}>
                <p><b>Name:</b> {profile.name}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Phone:</b> {profile.phone}</p>
                <p><b>Age:</b> {profile.age}</p>
                <p><b>Sex:</b> {profile.sex}</p>
                <p><b>Experience:</b> {profile.experience}</p>
                <p><b>Post:</b> {profile.post}</p>
              </div>
            )}

            {/* EDIT MODE */}
            {editing && (
              <div>
                {["name", "phone", "age", "sex", "experience", "post"].map(
                  (field) => (
                    <div key={field}>
                      <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </label>
                      <input
                        type="text"
                        value={profile[field] || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, [field]: e.target.value })
                        }
                        style={inputStyle}
                      />
                    </div>
                  )
                )}

                {/* Email (read only) */}
                <label>Email:</label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  style={{ ...inputStyle, background: "#eee" }}
                />

                <button
                  onClick={handleUpdate}
                  style={{
                    padding: "10px 20px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {msg && (
            <p style={{ marginTop: "15px", color: "green", textAlign: "center" }}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #bbb",
};