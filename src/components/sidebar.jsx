import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Aurora's Event Hub</h2>

      <nav className="nav-links">
        {/* PUBLIC */}
        <NavLink to="/" end className="nav-link">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/events" className="nav-link">
          📅 Events
        </NavLink>

        {/* ADMIN */}
        <NavLink to="/admin/dashboard" className="nav-link">
          🛠 Admin Dashboard
        </NavLink>

        <NavLink to="/admin/registrations" className="nav-link">
          📄 Registrations
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
