import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Hide back button on home page
  const hideBackBtn = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setShowLogoutModal(false);
    navigate("/admin/login");
  };

  return (
    <>
      <nav className="navbar">
        {/* ☰ Hamburger (mobile only) */}
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>

        {/* 🔙 Back Button */}
        {!hideBackBtn && (
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            title="Go back"
          >
            ←
          </button>
        )}

        <input
          type="text"
          placeholder="Search events..."
          className="search"
        />

        <div className="nav-right">
          <span>🔔</span>

          <div className="admin">
            <img
              src="https://i.pravatar.cc/40"
              alt="admin"
            />
            <span>Admin</span>

            <button
              className="logout-btn"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn confirm"
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

