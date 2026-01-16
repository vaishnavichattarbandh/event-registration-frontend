import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import AdminSidebar from "../components/adminsidebar";

const AdminLayout = () => (
  <div className="admin-layout">
    <Navbar />
    <div className="admin-body">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;


