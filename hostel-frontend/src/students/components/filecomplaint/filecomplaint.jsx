import React from "react";
import { useNavigate } from "react-router-dom";   // ✅ Import navigate
import electrician from "../../images/electrician.gif";
import plumber from "../../images/plumber.gif";
import carpenter from "../../images/carpenter.gif";
import cleaner from "../../images/cleaner.gif";
import "./filecomplaint.css";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const FileComplaint = () => {
  const navigate = useNavigate();

  // function to open form page with category
  const handleFileComplaint = (category) => {
    navigate(`/students/fileComplaint/${category}`);
  };

  return (
    <div>
      <Navbar/>

    <div className="file-complaint">
      <br/>
      <h1>Categories</h1>
      <p className="subtitle">
        Choose a service category below and file your complaint easily.
      </p>

      <div className="categories">

        {/* Electrician */}
        <div className="category-card">
          <img src={electrician} alt="Electrician" />
          <h2>Electrician</h2>
          <p>
            Electricians handle wiring issues, power cuts, and socket repairs to
            ensure your safety and proper electricity supply.
          </p>
          <button onClick={() => handleFileComplaint("Electrician")}>
            File Complaint
          </button>
        </div>

        {/* Plumber */}
        <div className="category-card">
          <img src={plumber} alt="Plumber" />
          <h2>Plumber</h2>
          <p>
            Plumbers take care of leaking taps, water blockages, and drainage
            issues to maintain proper water flow and hygiene.
          </p>
          <button onClick={() => handleFileComplaint("Plumber")}>
            File Complaint
          </button>
        </div>

        {/* Carpenter */}
        <div className="category-card">
          <img src={carpenter} alt="Carpenter" />
          <h2>Carpenter</h2>
          <p>
            Carpenters repair furniture, doors, and windows to keep your living
            space comfortable and well-maintained.
          </p>
          <button onClick={() => handleFileComplaint("Carpenter")}>
            File Complaint
          </button>
        </div>

        {/* Cleaner */}
        <div className="category-card">
          <img src={cleaner} alt="Cleaner" />
          <h2>Cleaner</h2>
          <p>
            Cleaners keep rooms, washrooms, and corridors clean and tidy to
            ensure a hygienic and healthy hostel environment.
          </p>
          <button onClick={() => handleFileComplaint("Cleaner")}>
            File Complaint
          </button>
        </div>

      </div>
<Footer/>
</div>
    </div>
  );
};

export default FileComplaint;