import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();

  const [formData, setFormData] = useState({
    eventName: eventName,
    fullName: "",
    rollNo: "",
    department: "",
    stream: "",
    year: "",
    semester: "",
    email: "",
    phone:"",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ STOP PAGE REFRESH
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("📤 Sending registration:", formData);

      // ✅ CORRECT API ROUTE
      await axios.post(
        "https://event-registration-backend-xxxx.onrender.com/api/register",
        formData
      );

      // ✅ RESET FORM
      setFormData({
        eventName: eventName,
        fullName: "",
        rollNo: "",
        department: "",
        stream: "",
        year: "",
        semester: "",
        email: "",
        phone: ""
      });

      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{eventName} Registration</h2>

        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
        <input name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
        <input name="stream" value={formData.stream} onChange={handleChange} placeholder="Stream" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
        <input name="semester" value={formData.semester} onChange={handleChange} placeholder="Semester" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={formData.contact} onChange={handleChange} placeholder="phone number" />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
};

export default Register;




