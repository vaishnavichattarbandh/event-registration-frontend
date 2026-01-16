import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Events</h2>

      <div>
        <div>
          <h4>Tree Plantation Program</h4>
          <button
            onClick={() =>
              navigate("/admin/events/Tree%20Plantation%20Program")
            }
          >
            View Registrations
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
