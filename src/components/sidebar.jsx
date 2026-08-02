import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);
  const [attendeesOpen, setAttendeesOpen] = useState(true); // Set to true so it's open by default

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="logo-circle">🎓</div>
          <div className="brand-title">
            <h2>Aurora</h2>
            <span>Event Hub</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </NavLink>

          {/* Events Collapsible */}
          <div className="nav-dropdown">
            <button
              className={`nav-link dropdown-btn ${eventsOpen ? "expanded" : ""}`}
              onClick={() => setEventsOpen(!eventsOpen)}
            >
              <div className="nav-link-content">
                <span className="nav-icon">📅</span>
                <span className="nav-label">Events</span>
              </div>
              <span className="chevron">{eventsOpen ? "▾" : "▸"}</span>
            </button>

            {eventsOpen && (
              <div className="dropdown-menu">
                <NavLink to="/admin/events" className="sub-link" onClick={closeSidebar}>
                  All Events
                </NavLink>
              </div>
            )}
          </div>

          {/* Attendees Collapsible */}
          <div className="nav-dropdown">
            <button
              className={`nav-link dropdown-btn ${attendeesOpen ? "expanded" : ""}`}
              onClick={() => setAttendeesOpen(!attendeesOpen)}
            >
              <div className="nav-link-content">
                <span className="nav-icon">👥</span>
                <span className="nav-label">Attendees</span>
              </div>
              <span className="chevron">{attendeesOpen ? "▾" : "▸"}</span>
            </button>

            {attendeesOpen && (
              <div className="dropdown-menu">
                <NavLink to="/admin/registrations" className="sub-link" onClick={closeSidebar}>
                  Registrations
                </NavLink>
                <NavLink to="/admin/qr-checkin" className="sub-link" onClick={closeSidebar}>
                  QR Check-in
                </NavLink>
              </div>
            )}
          </div>

          {/* Broadcasts / Mail */}
          <NavLink
            to="/admin/communications"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📢</span>
            <span className="nav-label">Communications</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </NavLink>
        </nav>

        {/* Footer Profile & Logout */}
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div className="admin-info">
              <h4>Administrator</h4>
              <span>Event Coordinator</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout} title="Logout">
            🚪
          </button>
        </div>
      </aside>

      {isOpen && <div className="overlay" onClick={closeSidebar} />}
    </>
  );
};

export default Sidebar;