import { useNavigate } from "react-router-dom";
import "../styles/events.css";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Hackathon",
      date: "18 February 2026",
      organizer: "CSE Department"
    },
    {
      id: 2,
      title: "Tech Talk",
      date: "20 March 2026",
      organizer: "ECE Department"
    },
    {
      id: 3,
      title: "Workshop",
      date: "2 April 2026",
      organizer: "IT Department"
    },
    {
      id: 4,
      title: "Cultural Fest",
      date: "10 April 2026",
      organizer: "Cultural Department"
    },
    {
      id: 5,
      title: "NextGen Entreprenuers",
      date: "21 April 2026",
      organizer: "E-Cell Department"
    },
    {
      id: 6,
      title: "Beat Bash",
      date: "28 April 2026",
      organizer: "Cultural Department",
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
