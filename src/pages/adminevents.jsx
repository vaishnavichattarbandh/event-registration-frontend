import { useEffect, useState } from "react";
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

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fallback for whichever token key was saved during login
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    if (!token) {
      alert("Session expired or token missing. Please log in again.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Event created successfully!");

      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
      });

      fetchEvents();
    } catch (err) {
      console.error("Create Event Error:", err);

      if (err.response?.status === 401) {
        alert("Unauthorized! Please log in again.");
      } else {
        alert(err.response?.data?.message || "Failed to create event.");
      }
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    if (!id) {
      alert("Error: Event ID is missing.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    // Fallback for whichever token key was saved during login
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    if (!token) {
      alert("Session expired or token missing. Please log in again.");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI state immediately
      setEvents((prevEvents) =>
        prevEvents.filter((event) => (event._id || event.id) !== id)
      );

      alert("✅ Event deleted successfully!");
    } catch (err) {
      console.error("Delete Error Details:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        alert("Unauthorized! Please log in again.");
      } else {
        alert(err.response?.data?.message || "Failed to delete event.");
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
          required
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

      <hr />

      <h3>Available Events</h3>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => {
                // Extract valid identifier (_id or id)
                const eventId = event._id || event.id;

                return (
                  <tr key={eventId || index}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.location}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(eventId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;