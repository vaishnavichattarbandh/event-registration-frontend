import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminregistrations.css";

const AdminRegistrations = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const limit = 5;

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/registrations",
        {
          params: { page, limit, search }
        }
      );

      setData(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setData([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page, search]);

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${deleteId}`
      );
      setDeleteId(null);
      fetchRegistrations();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-registrations">
      <h2>📋 Student Registrations</h2>

      {/* SEARCH + EXPORT */}
      <div className="top-bar">
        <input
          placeholder="Search..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        /><br/><br/>

        <button
          className="export-btn"
          onClick={() =>
            window.open("http://localhost:5000/api/registrations/export")
          }
        >
          📤 Export
        </button>
      </div>
    
      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Name</th>
            <th>Roll</th>
            <th>Dept</th>
            <th>Email</th>
            <th style={{ width: "120px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No data
              </td>
            </tr>
          ) : (
            data.map(r => (
              <tr key={r._id}>
                <td>{r.eventName}</td>
                <td>{r.fullName}</td>
                <td>{r.rollNo}</td>
                <td>{r.department}</td>
                <td>{r.email}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => setDeleteId(r._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> 
      <br/>
      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          ◀ Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next ▶
        </button><br/>
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this registration?</p>

            <div className="modal-actions">
              <button className="danger" onClick={confirmDelete}>
                Delete
              </button>
              <button onClick={() => setDeleteId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegistrations;




