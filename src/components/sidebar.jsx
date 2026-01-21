import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">Aurora's Event Hub</h2>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link" onClick={closeSidebar}>
            🏠 Dashboard
          </NavLink>
          <NavLink to="/events" className="nav-link" onClick={closeSidebar}>
            📅 Events
          </NavLink>
          <NavLink
            to="/admin/dashboard"
            className="nav-link"
            onClick={closeSidebar}
          >
            🛠 Admin Dashboard
          </NavLink>
          <NavLink
            to="/admin/registrations"
            className="nav-link"
            onClick={closeSidebar}
          >
            📄 Registrations
          </NavLink>
        </nav>
      </aside>

      {isOpen && <div className="overlay" onClick={closeSidebar} />}
    </>
  );
};

export default Sidebar;



