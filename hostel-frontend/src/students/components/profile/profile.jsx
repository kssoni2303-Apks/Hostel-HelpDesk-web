import React, { useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    full_name: "",
    email: "",
    phone_number: "",
    hostel_type: "",
    hostel_name: "",
    registration_number: "",
    role: "Student",
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?.id) return;

    const loadProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/students/profile/${user.id}`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Failed to load profile");
        setProfile(result.data);
      } catch (error) {
        console.error("Profile Error:", error);
        setMessage("Could not load profile.");
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/students/profile/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Update failed");

      setProfile(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      <form className="profile-form" onSubmit={handleUpdate}>
        <label>Name:</label>
        <input name="full_name" value={profile.full_name} onChange={handleChange} required disabled={!editing} />

        <label>Email:</label>
        <input name="email" type="email" value={profile.email} readOnly />

        <label>Phone:</label>
        <input name="phone_number" value={profile.phone_number || ""} onChange={handleChange} disabled={!editing} />

        <label>Hostel Type:</label>
        <select name="hostel_type" value={profile.hostel_type || ""} onChange={handleChange} disabled={!editing}>
          <option value="">Select Hostel Type</option>
          <option value="Boys">Boys Hostel</option>
          <option value="Girls">Girls Hostel</option>
        </select>

        <label>Hostel Name:</label>
        <input name="hostel_name" value={profile.hostel_name || ""} onChange={handleChange} disabled={!editing} />

        <label>Registration Number:</label>
        <input name="registration_number" value={profile.registration_number || ""} onChange={handleChange} disabled={!editing} />

        <button type="button" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit Profile"}
        </button>

        {editing && <button type="submit">Save Changes</button>}
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
