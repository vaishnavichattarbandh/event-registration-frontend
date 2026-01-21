import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="logo">Aurora's Event Hub</h2>

      <nav className="nav-links">
        <NavLink to="/" end className="nav-link" onClick={toggleSidebar}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/events" className="nav-link" onClick={toggleSidebar}>
          📅 Events
        </NavLink>

        <NavLink
          to="/admin/dashboard"
          className="nav-link"
          onClick={toggleSidebar}
        >
          🛠 Admin Dashboard
        </NavLink>

        <NavLink
          to="/admin/registrations"
          className="nav-link"
          onClick={toggleSidebar}
        >
          📄 Registrations
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
