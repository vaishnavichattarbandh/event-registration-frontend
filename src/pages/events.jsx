import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [registeredTitles, setRegisteredTitles] = useState([]);

  // Load user's registered event titles from localStorage
  useEffect(() => {
    const savedPasses = JSON.parse(localStorage.getItem("myRegistrations") || "[]");
    const titles = savedPasses.map((item) => (typeof item === "string" ? item : item.title));
    setRegisteredTitles(titles);
  }, []);

  const eventList = [
    {
      id: 1,
      title: "Tech Conference",
      date: "2026-10-21",
      location: "Hyderabad, India",
      dept: "IT Department",
      category: "Tech",
      seatsLeft: 12,
      description: "Explore upcoming trends in AI and cloud technology.",
    },
    {
      id: 2,
      title: "Hackathon",
      date: "2026-10-21",
      location: "Hyderabad, India",
      dept: "IT Department",
      category: "Tech",
      seatsLeft: 5,
      description: "24-hour coding marathon to solve real-world problems.",
    },
    {
      id: 3,
      title: "Cultural Fiesta",
      date: "2026-08-25",
      location: "Hyderabad, India",
      dept: "Cultural Department",
      category: "Cultural",
      seatsLeft: 28,
      description: "A celebration of music, dance, and creative arts.",
    },
    {
      id: 4,
      title: "Singing Contest",
      date: "2026-08-11",
      location: "Hyderabad, India",
      dept: "Cultural Department",
      category: "Cultural",
      seatsLeft: 3,
      description: "Showcase your vocal talents live on campus stage.",
    },
  ];

  // Helper to test if an event date matches the date filter
  const isWithinDateRange = (eventDateStr) => {
    if (dateFilter === "All") return true;

    const eventDate = new Date(eventDateStr);
    const today = new Date();

    if (dateFilter === "This Month") {
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }

    if (dateFilter === "Upcoming") {
      return eventDate >= today;
    }

    return true;
  };

  // Filter Logic
  const filteredEvents = eventList.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = isWithinDateRange(event.date);

    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <div className="events-container">
      {/* Header Banner */}
      <div className="events-header">
        <div>
          <h1>Explore Events</h1>
          <p>Discover and register for upcoming campus activities and workshops.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="events-filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Filter Dropdown */}
        <div className="date-select-wrapper">
          <select
            className="date-dropdown"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All">📅 All Dates</option>
            <option value="This Month">📅 This Month</option>
            <option value="Upcoming">📅 Upcoming</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="category-tabs">
          {["All", "Tech", "Cultural"].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.map((evt) => {
          const isRegistered = registeredTitles.includes(evt.title);

          return (
            <div key={evt.id} className="event-card">
              <div className="card-top">
                <span className="dept-tag">{evt.dept}</span>
                <span className="seats-tag">🔥 {evt.seatsLeft} Seats Left</span>
              </div>

              <h3 className="event-title">{evt.title}</h3>
              <p className="event-desc">{evt.description}</p>

              <div className="event-meta">
                <p>📅 <strong>Date:</strong> {evt.date}</p>
                <p>📍 <strong>Location:</strong> {evt.location}</p>
              </div>

              {isRegistered ? (
                <div className="registered-badge">✓ Registered Pass</div>
              ) : (
                <Link to={`/register/${evt.title}`} className="register-btn">
                  Register Pass →
                </Link>
              )}
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <p>No events found matching your current search & filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;