import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const hideBackBtn = location.pathname === "/";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setShowLogoutModal(false);
    navigate("/admin/login");
  };

  return (
    <>
      <nav className="navbar">

        {/* Left */}

        <div className="nav-left">

          <button
            className="hamburger"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          {!hideBackBtn && (
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
          )}

          <div className="nav-title">
            <h2>Nexus Event Hub</h2>
            <span>{today}</span>
          </div>

        </div>

        {/* Center */}

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search events, students..."
          />

        </div>

        {/* Right */}

        <div className="nav-right">

          <div className="notification">

            🔔

            <span className="badge">
              3
            </span>

          </div>

          <div className="admin-profile">

            <img
              src="https://i.pravatar.cc/45"
              alt="Admin"
            />

            <div>

              <h4>Administrator</h4>

              <p>Event Coordinator</p>

            </div>

          </div>

          <button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>

        </div>

      </nav>

      {showLogoutModal && (

        <div className="modal-overlay">

          <div className="logout-modal">

            <div className="logout-icon">
              🚪
            </div>

            <h2>Logout</h2>

            <p>
              Are you sure you want to logout?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default Navbar;

