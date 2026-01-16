import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const PublicLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      {/* THIS is the "main wrapper" */}
      <div className="admin-main">
        <Navbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
