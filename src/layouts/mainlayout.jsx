import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../styles/mainlayout.css";

const MainLayout = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="right-panel">
        <Navbar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;






