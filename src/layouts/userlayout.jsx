import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/userlayout.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/signup");
  };

  return (
    <div className="user-app-container">
      {/* Top Header Navigation */}
      <header className="user-navbar">
        <div className="nav-brand" onClick={() => navigate("/events")}>
          <span className="logo-icon">🎓</span>
          <h2>Aurora Event Hub</h2>
        </div>

        <nav className="user-nav-links">
          <Link to="/events" className="nav-item">
            📅 Explore Events
          </Link>
          <Link to="/student/dashboard" className="nav-item">
            🎟️ My Dashboard
          </Link>
        </nav>

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