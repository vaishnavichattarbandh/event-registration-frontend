import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "../styles/admindashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios
      .get("https://event-registration-backend-7d42.onrender.com/api/registrations")
      .then(res => {
        // ✅ FIX: support paginated & non-paginated response
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setRegistrations(list);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        setRegistrations([]);
      });
  }, []);

  /* ===== TOTAL REGISTRATIONS ===== */
  const totalRegistrations = registrations.length;

  /* ===== EVENT-WISE COUNT ===== */
  const eventCounts = {};
  registrations.forEach(r => {
    if (r.eventName) {
      eventCounts[r.eventName] = (eventCounts[r.eventName] || 0) + 1;
    }
  });

  const barData = {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        label: "Registrations",
        data: Object.values(eventCounts),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  /* ===== REGISTRATIONS OVER TIME ===== */
  const lineData = {
    labels: registrations.map((_, i) => `Entry ${i + 1}`),
    datasets: [
      {
        label: "Registrations",
        data: registrations.map((_, i) => i + 1),
        borderColor: "#22c55e",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="admin-dashboard">

      {/* ===== CARDS ===== */}
      <div className="cards">
        <div className="card">
          <h3>Total Events</h3>
          <p>{Object.keys(eventCounts).length}</p>
        </div>

        <div className="card">
          <h3>Registrations</h3>
          <p>{totalRegistrations}</p>
        </div>

        <div className="card">
          <h3>Upcoming</h3>
          <p>1</p>
        </div>

        <div className="card">
          <h3>Live Users</h3>
          <p>—</p>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts">
        <div className="chart-box">
          <h3>📈 Registrations Over Time</h3>
          {registrations.length > 0 ? (
            <Line data={lineData} />
          ) : (
            <p>No data</p>
          )}
        </div>

        <div className="chart-box">
          <h3>📊 Event-wise Registrations</h3>
          {registrations.length > 0 ? (
            <Bar data={barData} />
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

