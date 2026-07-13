import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../styles/mainlayout.css";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-structural-frame">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      {/* Main Content */}
      <div className="right-panel-view">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="main-content-viewport">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

