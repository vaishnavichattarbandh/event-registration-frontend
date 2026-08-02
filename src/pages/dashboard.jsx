import { Link } from "react-router-dom";
import "../styles/userdashboard.css";

const Dashboard = () => {
  const userName = localStorage.getItem("userName") || "User";

  // Mock registrations list (can be updated dynamically later)
  const myRegistrations = [
    {
      id: 1,
      title: "Singing Contest",
      date: "2026-08-11",
      location: "Hyderabad, India",
      ticketCode: "AURORA-SNG-8812",
      status: "Confirmed",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Welcome back, {userName}! 👋</h2>
        <p>Manage your event passes and discover new upcoming events on campus.</p>
        <Link to="/events" className="explore-btn">
          Explore Events →
        </Link>
      </div>

      {/* Quick Metrics */}
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
            <p>Attendee Account</p>
          </div>
        </div>
      </div>

      {/* Registered Tickets List */}
      <div className="dashboard-section">
        <h3>Your Event Tickets</h3>
        {myRegistrations.length > 0 ? (
          <div className="tickets-grid">
            {myRegistrations.map((item) => (
              <div key={item.id} className="ticket-card">
                <div className="ticket-header">
                  <h4>{item.title}</h4>
                  <span className="status-badge">{item.status}</span>
                </div>
                <div className="ticket-details">
                  <p>📅 <strong>Date:</strong> {item.date}</p>
                  <p>📍 <strong>Location:</strong> {item.location}</p>
                  <p>🔑 <strong>Pass ID:</strong> <code>{item.ticketCode}</code></p>
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

export default Dashboard;
