import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Registration Successful!</h1>

        <p className="success-message">
          Thank you for registering for the event.
          <br />
          Your registration has been submitted successfully.
        </p>

        <div className="success-info">

          <div className="info-item">
            <span>📧</span>
            <p>Please check your email for future event updates.</p>
          </div>

          <div className="info-item">
            <span>🕒</span>
            <p>Arrive at least 15 minutes before the event starts.</p>
          </div>

          <div className="info-item">
            <span>🎓</span>
            <p>Carry your college ID card on the event day.</p>
          </div>

        </div>

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={() => navigate("/events")}
          >
            Browse More Events
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

        </div>

      </div>
    </div>
  );
};

export default Success;
