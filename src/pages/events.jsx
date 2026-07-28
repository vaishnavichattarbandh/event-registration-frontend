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
      organizer: "Entrepreneurship Development Cell"
    },
    {
      id: 6,
      title: "Beat Bash",
      date: "28 April 2026",
      organizer: "Cultural Department",
    },
    {
      id: 7,
      title: "Technical Symposium",
      date: "29 April 2026",
      organizer: "Computer Science Department",
    },
    {
      id: 8,
      title: "Cyber Security Seminar",
      date: "2 May 2026",
      organizer: "Information Security Department",
    },
    {
      id: 9,
      title: "Entrepreneurship Summit",
      date: "4 May 2026",
      organizer: "Entrepreneurship Development Cell",
    },
    {
      id: 10,
      title: "Talent Hunt",
      date: "10 May 2026",
      organizer: "Student Affairs Department",
    },
    {
      id: 11,
      title: "Fashion Fiesta",
      date: "21 May 2026",
      organizer: "Cultural Department",
    },


    
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
