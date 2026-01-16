import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem("adminTokenExpiry");
    if (!expiry) return;

    const timeLeft = expiry - Date.now();

    if (timeLeft <= 0) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminTokenExpiry");
      navigate("/admin/login");
      return;
    }

    const timer = setTimeout(() => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminTokenExpiry");
      navigate("/admin/login");
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [navigate]);
};

export default useAutoLogout;
