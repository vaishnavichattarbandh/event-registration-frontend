import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const Admin = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch registrations
  useEffect(() => {
    axios
      .get("https://event-registration-backend-7d42.onrender.com/api/registrations")
      .then((res) => {
        // backend sends { data, totalPages, currentPage }
        setData(res.data.data || []);
      })
      .catch((err) => {
        console.error("Fetch failed", err);
        setData([]);
      });
  }, []);

  // ✅ Search filter
  const filteredData = data.filter((row) =>
    row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Export Excel
  const exportExcel = () => {
    window.location.href =
      "https://event-registration-backend-7d42.onrender.com/api/registrations/export/excel";
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <div className="top-bar">
        <button onClick={exportExcel}>📤 Export to Excel</button>

        <input
          type="text"
          placeholder="Search by name, roll, department..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Dept</th>
            <th>Stream</th>
            <th>Year</th>
            <th>Sem</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" align="center">
                No data found
              </td>
            </tr>
          ) : (
            filteredData.map((row) => (
              <tr key={row._id}>
                <td>{row.fullName}</td>
                <td>{row.rollNo}</td>
                <td>{row.department}</td>
                <td>{row.stream}</td>
                <td>{row.year}</td>
                <td>{row.sem}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
