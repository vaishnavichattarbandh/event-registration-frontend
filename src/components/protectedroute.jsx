// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAutoLogout from "../hooks/useautologout";

const ProtectedRoute = () => {
  const isAuthenticated = true; // replace with real check
  useAutoLogout();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;




