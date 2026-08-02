import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import "../styles/admindashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const BASE_URL = "https://event-registration-backend-1.onrender.com";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/api/registrations`);

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setRegistrations(list);
    } catch (err) {
      console.error(err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
      EVENT COUNTS
  ========================== */

  const eventCounts = {};

  registrations.forEach((r) => {
    if (!r.eventName) return;

    eventCounts[r.eventName] =
      (eventCounts[r.eventName] || 0) + 1;
  });

  /* ==========================
      DEPARTMENT COUNTS
  ========================== */

  const departmentCounts = {};

  registrations.forEach((r) => {
    if (!r.department) return;

    departmentCounts[r.department] =
      (departmentCounts[r.department] || 0) + 1;
  });

  const topEvent = useMemo(() => {
    const entries = Object.entries(eventCounts);

    if (entries.length === 0) return "-";

    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [registrations]);

  const topDepartment = useMemo(() => {
    const entries = Object.entries(departmentCounts);

    if (entries.length === 0) return "-";

    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [registrations]);

  /* ==========================
      CHARTS
  ========================== */

  const lineData = {
    labels: registrations.map((_, i) => `#${i + 1}`),

    datasets: [
      {
        label: "Registrations",
        data: registrations.map((_, i) => i + 1),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb",
        tension: .4,
        fill: false,
      },
    ],
  };

  const eventChart = {
    labels: Object.keys(eventCounts),

    datasets: [
      {
        label: "Students",
        data: Object.values(eventCounts),
        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#14b8a6",
        ],
      },
    ],
  };

  const deptChart = {
    labels: Object.keys(departmentCounts),

    datasets: [
      {
        data: Object.values(departmentCounts),

        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f97316",
          "#a855f7",
          "#ec4899",
          "#14b8a6",
        ],
      },
    ],
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1>Admin Dashboard</h1>

          <p>
            Monitor registrations, events and student activity.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={loadDashboard}
        >
          Refresh
        </button>

      </div>

      {/* LOADING */}

      {loading &&

      <div className="loading-card">

        Loading dashboard...

      </div>

      }

      {!loading && (

        <>

          {/* ================= CARDS ================= */}

          <div className="cards">

            <div className="card blue">
              <h4>Total Registrations</h4>
              <h2>{registrations.length}</h2>
            </div>

            <div className="card green">
              <h4>Total Events</h4>
              <h2>{Object.keys(eventCounts).length}</h2>
            </div>

            <div className="card orange">
              <h4>Departments</h4>
              <h2>{Object.keys(departmentCounts).length}</h2>
            </div>

            <div className="card purple">
              <h4>Top Event</h4>
              <h2>{topEvent}</h2>
            </div>

          </div>

          {/* ================= PROGRESS ================= */}

          <div className="progress-card">

            <h3>Registration Progress</h3>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width:
                    registrations.length > 0
                      ? `${Math.min(
                          registrations.length,
                          100
                        )}%`
                      : "0%",
                }}
              ></div>

            </div>

            <p>

              {registrations.length}
              {" "}students registered

            </p>

          </div>

          {/* ================= CHARTS ================= */}

          <div className="chart-grid">

            <div className="chart-card">

              <h3>Registration Growth</h3>

              {registrations.length > 0
                ? <Line data={lineData}/>
                : <p>No data available.</p>}

            </div>

            <div className="chart-card">

              <h3>Event-wise Registrations</h3>

              {registrations.length > 0
                ? <Bar data={eventChart}/>
                : <p>No data available.</p>}

            </div>

          </div>

          <div className="chart-grid">

            <div className="chart-card">

              <h3>Department Distribution</h3>

              {registrations.length > 0
                ? <Doughnut data={deptChart}/>
                : <p>No data available.</p>}

            </div>

            <div className="info-card">

              <h3>Quick Summary</h3>

              <ul>

                <li>
                  Total Students :
                  <strong>
                    {" "}
                    {registrations.length}
                  </strong>
                </li>

                <li>
                  Events :
                  <strong>
                    {" "}
                    {Object.keys(eventCounts).length}
                  </strong>
                </li>

                <li>
                  Top Event :
                  <strong>
                    {" "}
                    {topEvent}
                  </strong>
                </li>

                <li>
                  Top Department :
                  <strong>
                    {" "}
                    {topDepartment}
                  </strong>
                </li>

              </ul>

            </div>

          </div>

          {/* ================= RECENT TABLE ================= */}

          <div className="table-card">

            <div className="table-header">

              <h2>Recent Registrations</h2>

            </div>

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Event</th>

                  <th>Department</th>

                  <th>Email</th>

                </tr>

              </thead>

              <tbody>

                {registrations.length === 0 && (

                  <tr>

                    <td colSpan="4">
                      No registrations found.
                    </td>

                  </tr>

                )}

                {registrations
                  .slice(0, 8)
                  .map((student) => (

                    <tr key={student._id}>

                      <td>{student.fullName}</td>

                      <td>{student.eventName}</td>

                      <td>{student.department}</td>

                      <td>{student.email}</td>

                    </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="quick-actions">

            <button>➕ Add Event</button>

            <button>📄 Registrations</button>

            <button>📤 Export Excel</button>

            <button>⚙ Manage Events</button>

          </div>

        </>

      )}

    </div>
  );
};

export default AdminDashboard;

