import React from "react";
import "../styles/events.css";

const EventCard = ({ title, date, location, description, onRegister }) => {
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p className="event-date">📅 {date}</p>
      <p className="event-location">📍 {location}</p>
      <p className="event-desc">{description}</p>

      <button className="register-btn" onClick={onRegister}>
        Register Now
      </button>
    </div>
  );
};

export default EventCard;
