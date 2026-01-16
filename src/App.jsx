import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Events from "./pages/events";
import Register from "./pages/register";
import Success from "./pages/success";

import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/admindashboard";
import AdminRegistrations from "./pages/adminregistrations";
import AdminEvents from "./pages/adminevents";
import EventRegistrations from "./pages/eventregistrations";

import MainLayout from "./layouts/mainlayout";
import ProtectedRoute from "./components/protectedroute";

function App() {
  return (
    <Router>
      <Routes>

        {/* ===== MAIN LAYOUT ===== */}
        <Route element={<MainLayout />}>

          {/* PUBLIC */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />

          {/* ADMIN (PROTECTED) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/:eventName" element={<EventRegistrations />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
          </Route>

        </Route>

        {/* PUBLIC (NO LAYOUT) */}
        <Route path="/register/:eventName" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
