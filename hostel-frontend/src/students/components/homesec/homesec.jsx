
import React from "react";
import About from "../about/about";
import Navbar from "../navbar/navbar";
import student_web from "../../images/web student.png";
import Footer from "../footer/footer";

const Homesec = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />  

      {/* TOP IMAGE */}
      <img src={student_web} alt="student web" id="home" />

      {/* ABOUT SECTION */}
      <section id="about">
        <About />
      </section>
      <Footer/>
    </>
  );
};

export default Homesec;
