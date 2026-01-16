import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventRegistrations = () => {
  const { eventName } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/registrations")
      .then(res => {
        const filtered = res.data.filter(
          r => r.eventName === decodeURIComponent(eventName)
        );
        setData(filtered);
      });
  }, [eventName]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrations for {decodeURIComponent(eventName)}</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.fullName}</td>
              <td>{r.rollNo}</td>
              <td>{r.department}</td>
              <td>{r.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventRegistrations;
