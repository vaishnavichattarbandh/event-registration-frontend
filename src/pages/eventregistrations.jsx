import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventRegistrations = () => {
  const { eventName } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://event-registration-backend-7d42.onrender.com/api/registrations",
        {
          params: {
            page: 1,
            limit: 1000 // fetch all for filtering
          }
        }
      )
      .then(res => {
        const list = res.data.data || [];

        const filtered = list.filter(
          r => r.eventName === decodeURIComponent(eventName)
        );

        setData(filtered);
      })
      .catch(err => {
        console.error("Event registration fetch error:", err);
        setData([]);
      });
  }, [eventName]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Registrations for {decodeURIComponent(eventName)}</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No registrations found
              </td>
            </tr>
          ) : (
            data.map((r, i) => (
              <tr key={i}>
                <td>{r.fullName}</td>
                <td>{r.rollNo}</td>
                <td>{r.department}</td>
                <td>{r.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventRegistrations;

