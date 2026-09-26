import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./complaintform.css";

const ComplaintForm = () => {
  const { category } = useParams();
  const [showOtherHostel, setShowOtherHostel] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleHostelChange = (e) => {
    setShowOtherHostel(e.target.value === "Other");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneValue = e.target.phone.value.trim();
    const roomValue = e.target.room.value.trim();

    if (!/^[0-9]+$/.test(phoneValue) || phoneValue.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^[0-9]+$/.test(roomValue)) {
      alert("Room number must contain only digits.");
      return;
    }

    const complaintData = {
      student_id: user?.id || null,
      name: e.target.name.value.trim(),
      room: roomValue,
      phone: phoneValue,
      email: e.target.email.value.trim(),
      hostelType: e.target.hostelType.value,
      hostelName: e.target.hostelName.value,
      otherHostel: showOtherHostel ? e.target.otherHostel.value : "",
      time: e.target.time.value,
      details: e.target.details.value.trim(),
      category: category || "General",
    };

    try {
      const response = await fetch("http://localhost:5000/api/complaints/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`🎉 Complaint submitted successfully! Your Complaint ID is: 👉 ${data.complaintId}`);
        e.target.reset();
        setShowOtherHostel(false);
      } else {
        alert("Failed to submit complaint: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please check that the backend is running.");
    }
  };

  return (
    <div className="complaint-wrapper">
      <div className="float-shape shape1"></div>
      <div className="float-shape shape2"></div>
      <div className="float-shape shape3"></div>

      <div className="complaint-container">
        <h2 className="complaint-title">🛠️ File Complaint – {category}</h2>
        <p className="complaint-quote">
          “Your comfort matters. Just tell us the issue — we’re here to fix it! 💚”
        </p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Your Name <span style={{color: "red"}}>*</span></label>
            <input name="name" type="text" defaultValue={user?.full_name || ""} placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>🏠 Room Number <span style={{color: "red"}}>*</span></label>
            <input name="room" type="text" placeholder="E.g. 102" required />
          </div>

          <div className="form-group">
            <label>📞 Phone Number <span style={{color: "red"}}>*</span></label>
            <input name="phone" type="text" defaultValue={user?.phone_number || ""} placeholder="9876543210" required />
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <input name="email" type="email" defaultValue={user?.email || ""} placeholder="example@gmail.com" required />
          </div>

          <div className="form-group">
            <label>🏫 Hostel Type</label>
            <select name="hostelType" defaultValue={user?.hostel_type || ""} required>
              <option value="">Select Hostel Type</option>
              <option value="Boys">Boys Hostel</option>
              <option value="Girls">Girls Hostel</option>
            </select>
          </div>

          <div className="form-group">
            <label>🏡 Hostel Name</label>
            <select name="hostelName" onChange={handleHostelChange} defaultValue={user?.hostel_name || ""} required>
              <option value="">Select Hostel</option>
              <option value="Shipra">Shipra Hostel</option>
              <option value="Ganga">Ganga Hostel</option>
              <option value="Yamuna">Yamuna Hostel</option>
              <option value="Kaveri">Kaveri Hostel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {showOtherHostel && (
            <div className="form-group">
              <label>🏡 Enter Your Hostel Name</label>
              <input name="otherHostel" type="text" placeholder="Enter hostel name" required />
            </div>
          )}

          <div className="form-group">
            <label>⏰ Preferred Time</label>
            <select name="time" required>
              <option value="">Choose Time</option>
              <option>9 AM - 11 AM</option>
              <option>11 AM - 1 PM</option>
              <option>2 PM - 4 PM</option>
              <option>4 PM - 6 PM</option>
              <option>Anytime</option>
            </select>
          </div>

          <div className="form-group form-full">
            <label>📝 Complaint Details</label>
            <textarea name="details" placeholder="Describe your issue clearly..." rows="4" required />
          </div>

          <button className="submit-btn" type="submit">Submit Complaint ✨</button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
