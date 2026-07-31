import { useState } from "react";
import axios from "axios";
import "../styles/adminevents.css";

const BASE_URL = "https://event-registration-backend-1.onrender.com";

const AdminEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/events`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Event created successfully!");

      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
      });

      console.log(res.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      } else {
        alert("Failed to create event.");
      }
    }
  };

  return (
    <div className="admin-events-container">
      <h2>📅 Event Management</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          required
        />

        <button type="submit">➕ Add Event</button>
      </form>
    </div>
  );
};

export default AdminEvents;