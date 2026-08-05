import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/usersidebar.css"; // or your sidebar css path

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* CRITICAL FIX: Only render the dark overlay backdrop if on MOBILE screen */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`user-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>Nexus</h2>
          <span>EVENT HUB</span>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/user/dashboard"
            className={`nav-item ${location.pathname.includes("dashboard") ? "active" : ""}`}
          >
            🎟️ My Dashboard
          </Link>
          <Link
            to="/events"
            className={`nav-item ${location.pathname.includes("events") ? "active" : ""}`}
          >
            🔍 Explore Events
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;