import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../styles/adminregistrations.css";

const BASE_URL = "https://event-registration-backend-1.onrender.com";

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const limit = 8;
  const token = localStorage.getItem("adminToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* ============================
      FETCH REGISTRATIONS
  ============================ */
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/registrations`, {
        params: {
          page,
          limit,
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const list = res.data.data || [];
      setRegistrations(list);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page, search]);

  /* ============================
      UNIQUE FILTERS
  ============================ */
  const departments = useMemo(() => {
    return [...new Set(registrations.map((r) => r.department))]
      .filter(Boolean)
      .sort();
  }, [registrations]);

  const events = useMemo(() => {
    return [...new Set(registrations.map((r) => r.eventName))]
      .filter(Boolean)
      .sort();
  }, [registrations]);

  /* ============================
      FILTER DATA
  ============================ */
  const filteredData = registrations.filter((student) => {
    const departmentMatch =
      departmentFilter === "" || student.department === departmentFilter;
    const eventMatch =
      eventFilter === "" || student.eventName === eventFilter;
    return departmentMatch && eventMatch;
  });

  /* ============================
      DASHBOARD STATS
  ============================ */
  const totalStudents = filteredData.length;
  const totalDepartments = new Set(
    filteredData.map((s) => s.department)
  ).size;
  const totalEvents = new Set(filteredData.map((s) => s.eventName)).size;

  const topEvent = (() => {
    const counts = {};
    filteredData.forEach((student) => {
      counts[student.eventName] = (counts[student.eventName] || 0) + 1;
    });

    let highest = "-";
    let max = 0;

    Object.entries(counts).forEach(([event, count]) => {
      if (count > max) {
        max = count;
        highest = event;
      }
    });

    return highest;
  })();

  /* ============================
      DELETE REGISTRATION
  ============================ */
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/registrations/${deleteId}`,
        config
      );
      setDeleteId(null);
      fetchRegistrations();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      alert("Unable to delete registration.");
    }
  };

  /* ============================
      EXPORT
  ============================ */
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/registrations/export/excel`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const file = new Blob([response.data]);
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "registrations.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Export failed");
    }
  };

  /* ============================
      JSX
  ============================ */
  return (
    <div className="admin-registrations">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Student Registrations</h1>
          <p>Manage registrations, search students and export reports.</p>
        </div>
        <div className="header-buttons">
          <button className="refresh-btn" onClick={fetchRegistrations}>
            🔄 Refresh
          </button>
          <button className="export-btn" onClick={handleExport}>
            📤 Export Excel
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h4>Total Students</h4>
          <h2>{totalStudents}</h2>
        </div>
        <div className="stat-card green">
          <h4>Events</h4>
          <h2>{totalEvents}</h2>
        </div>
        <div className="stat-card orange">
          <h4>Departments</h4>
          <h2>{totalDepartments}</h2>
        </div>
        <div className="stat-card purple">
          <h4>Top Event</h4>
          <h2>{topEvent}</h2>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Search by student, email, roll number..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      {/* LOADING */}
      {loading && <div className="loading-card">Loading registrations...</div>}

      {/* REGISTRATION TABLE */}
      {!loading && (
        <div className="table-card">
          <div className="table-header">
            <div>
              <h2>Student Registrations</h2>
              <p>{filteredData.length} registration(s) found</p>
            </div>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Event</th>
                  <th>Roll No</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-cell">
                      <div className="empty-state">
                        <h3>No registrations found</h3>
                        <p>Try changing your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((student, index) => {
                    const initials = student.fullName
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase();

                    return (
                      <tr key={student._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>
                          <div className="student-info">
                            <div className="avatar">{initials}</div>
                            <div>
                              <strong>{student.fullName}</strong>
                              <br />
                              <span>{student.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{student.eventName}</td>
                        <td>{student.rollNo}</td>
                        <td>
                          <span className="dept-badge">
                            {student.department}
                          </span>
                        </td>
                        <td>
                          <span className="status success">Registered</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={() => setSelectedStudent(student)}
                            >
                              👁
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => setDeleteId(student._id)}
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              ◀ Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next ▶
            </button>
          </div>
        </div>
      )}

      {/* STUDENT DETAILS MODAL */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Student Details</h2>
            <div className="details-grid">
              <div>
                <strong>Name</strong>
                <p>{selectedStudent.fullName}</p>
              </div>
              <div>
                <strong>Email</strong>
                <p>{selectedStudent.email}</p>
              </div>
              <div>
                <strong>Roll Number</strong>
                <p>{selectedStudent.rollNo}</p>
              </div>
              <div>
                <strong>Department</strong>
                <p>{selectedStudent.department}</p>
              </div>
              <div>
                <strong>Event</strong>
                <p>{selectedStudent.eventName}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-card delete-card">
            <div className="delete-icon">⚠</div>
            <h2>Delete Registration?</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegistrations;