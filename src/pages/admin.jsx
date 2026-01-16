import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const Admin = () => {
const [data, setData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/registrations")
      .then(res => setData(res.data));
  }, []);

  const exportExcel = () => {
    window.location.href = "http://localhost:5000/api/export";
    const filteredData = data.filter((row) =>
  row.slice(1).some((cell) =>
    cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <button onClick={exportExcel}>Export to Excel</button>
      <input
  type="text"
  placeholder="Search by name, roll, department..."
  className="search-box"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


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
            {filteredData.map((row, i) => (

            <tr key={i}>
              {row.slice(1).map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
