import { useNavigate } from "react-router-dom";
import "../styles/events.css";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Hackathon",
      date: "18 April 2026",
      organizer: "CSE Department"
    },
    {
      id: 2,
      title: "Tech Talk",
      date: "19 April 2026",
      organizer: "ECE Department"
    },
    {
      id: 3,
      title: "Workshop",
      date: "20 April 2026",
      organizer: "IT Department"
    }
  ];

  return (
    <div className="events-page">
      <h1>All Events</h1>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.title}</h3>
            <p><b>Date:</b> {event.date}</p>
            <p><b>Organizer:</b> {event.organizer}</p>

            {/* ✅ PASS EVENT NAME */}
            <button onClick={() => navigate(`/register/${event.title}`)}>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
