import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "../styles/userdashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [myRegistrations, setMyRegistrations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedName = localStorage.getItem("userName");

    if (!token) {
      navigate("/signup");
      return;
    }

    if (storedName) {
      setUserName(storedName);
    }

    const saved = JSON.parse(localStorage.getItem("myRegistrations") || "null");
    if (saved && saved.length > 0) {
      setMyRegistrations(saved);
    } else {
      setMyRegistrations([
        {
          id: 1,
          title: "Tech Conference",
          date: "2026-10-21",
          location: "Hyderabad, India",
          ticketCode: "AURORA-TC-1021",
          status: "Confirmed",
        },
      ]);
    }
  }, [navigate]);

  // Helper to generate dynamic Google Calendar links
  const getGoogleCalendarUrl = (item) => {
    // Format date string (YYYYMMDD)
    const eventDate = item.date ? item.date.replace(/-/g, "") : "20261021";
    const startTime = `${eventDate}T090000Z`;
    const endTime = `${eventDate}T170000Z`;

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const text = `&text=${encodeURIComponent(item.title)}`;
    const details = `&details=${encodeURIComponent(`Pass ID: ${item.ticketCode} - Registered via Aurora Event Hub`)}`;
    const location = `&location=${encodeURIComponent(item.location || "Hyderabad, India")}`;
    const dates = `&dates=${startTime}/${endTime}`;

    return `${baseUrl}${text}${details}${location}${dates}`;
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Hero */}
      <div className="welcome-banner">
        <h2>Welcome back, {userName}! 👋</h2>
        <p>Manage your event passes and explore new campus events.</p>
        <Link to="/events" className="explore-btn">
          Explore Events →
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric-card">
          <span className="metric-icon">🎟️</span>
          <div>
            <h3>{myRegistrations.length}</h3>
            <p>Registered Events</p>
          </div>
        </div>
        <div className="metric-card">
          <span className="metric-icon">🌟</span>
          <div>
            <h3>Active</h3>
            <p>Attendee Pass</p>
          </div>
        </div>
      </div>

      {/* Ticket Pass List */}
      <div className="dashboard-section">
        <h3>Your Event Passes</h3>
        {myRegistrations.length > 0 ? (
          <div className="tickets-grid">
            {myRegistrations.map((item, idx) => (
              <div key={item.id || idx} className="ticket-card">
                <div className="ticket-main-info">
                  <div className="ticket-header">
                    <h4>{item.title}</h4>
                    <span className="status-badge">{item.status || "Confirmed"}</span>
                  </div>
                  
                  <div className="ticket-details">
                    <p>📅 <strong>Date:</strong> {item.date}</p>
                    <p>📍 <strong>Location:</strong> {item.location}</p>
                    <p>🔑 <strong>Pass ID:</strong> <code>{item.ticketCode}</code></p>
                  </div>

                  {/* Add to Google Calendar Action Link */}
                  <a
                    href={getGoogleCalendarUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calendar-add-btn"
                  >
                    📅 Add to Google Calendar
                  </a>
                </div>

                {/* QR Code Section */}
                <div className="qr-container">
                  <QRCodeSVG
                    value={item.ticketCode || "AURORA-PASS-001"}
                    size={80}
                    bgColor="#1e293b"
                    fgColor="#ffffff"
                    level="M"
                  />
                  <span>Scan at Entry</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <p>You haven't registered for any events yet.</p>
            <Link to="/events" className="browse-link">Browse events now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;