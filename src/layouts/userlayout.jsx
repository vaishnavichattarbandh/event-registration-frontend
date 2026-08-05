import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import "../styles/userlayout.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const toggleSidebar = () => {
    if (isMobile) setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="user-app-container">
      {/* Fixed on desktop, Drawer on Mobile */}
      <UserSidebar 
        isOpen={isMobile ? isMobileOpen : true} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Top Navbar */}
      <header className="user-navbar">
        <button 
          className="hamburger-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        <div className="user-profile-menu">
          <span className="user-name">👋 Hi, {userName}</span>
          <button className="user-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="user-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;