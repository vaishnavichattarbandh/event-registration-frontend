import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />

      <div className="content-wrapper">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
