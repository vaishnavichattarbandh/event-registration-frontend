  import { Navigate, Outlet } from "react-router-dom";
import useAutoLogout from "../hooks/useautologout";

const ProtectedRoute = () => {
  useAutoLogout();

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;




