import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth & Entry Pages
import SignUp from "./pages/signup";
import AdminLogin from "./pages/adminlogin";

// Student / User Pages
import UserDashboard from "./pages/userdashboard";
import Events from "./pages/events";
import Register from "./pages/register";
import Success from "./pages/success";

// Admin Pages
import AdminDashboard from "./pages/admindashboard";
import AdminRegistrations from "./pages/adminregistrations";
import AdminEvents from "./pages/adminevents";
import EventRegistrations from "./pages/eventregistrations";
import AdminQRCheckin from "./pages/adminqrcheckin";
import AdminCommunications from "./pages/admincommunications";
import AdminSettings from "./pages/adminsettings";
// Layouts & Guards
import UserLayout from "./layouts/userlayout";
import MainLayout from "./layouts/mainlayout";
import ProtectedRoute from "./components/protectedroute";

// Smart Root Redirector based on user role & session existence
const RootRedirect = () => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  // If logged in as Admin, send to Admin Dashboard
  if (adminToken || role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If logged in as Student, send to User Dashboard
  if (userToken && role === "student") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Default fallback for guests
  return <Navigate to="/signup" replace />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* ===== 1. AUTHENTICATION / ENTRY ROUTES ===== */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ===== 2. USER PORTAL (WITH TOP NAVBAR) ===== */}
        <Route element={<UserLayout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        <Route path="/register/:eventName" element={<Register />} />
        <Route path="/success" element={<Success />} />

        {/* ===== 3. PROTECTED ADMIN PORTAL (WITH SIDEBAR LAYOUT) ===== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/attendees" element={<AdminRegistrations />} />
            <Route path="/admin/qr-checkin" element={<AdminQRCheckin />} />
            <Route path="/admin/events/:eventName" element={<EventRegistrations />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
            <Route path="/admin/communications" element={<AdminCommunications />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
          </Route>
        </Route>

        {/* ===== 4. FALLBACK ROUTE ===== */}
        <Route path="*" element={<RootRedirect />} />

      </Routes>
    </Router>
  );
}

export default App;