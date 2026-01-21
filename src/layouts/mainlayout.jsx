import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar} />}

      {/* Main Content */}
      <div
        className="right-panel"
        style={{
          marginLeft: window.innerWidth > 768 ? "240px" : "0",
        }}
      >
        <Navbar onMenuClick={openSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
