import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div className="right-panel">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;


