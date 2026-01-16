import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <h2>✅ Registration Successful</h2>
        <p>
          Thank you for registering for the event.
          <br />
          Your details have been recorded successfully.
        </p>

        <button onClick={() => navigate("/events")}>
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default Success;

