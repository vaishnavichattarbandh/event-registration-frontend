import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../styles/main-layout-structure.css"; // We will create this simple file next!

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-structural-frame">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Modern Centered Main View Workspace */}
      <div className="right-panel-view">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="main-content-viewport">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

