import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* ✅ WELCOME CARD (REPLACED HERO) */}
      <section className="welcome-card">
        <h1>🎉 Welcome to Aurora’s Event Hub</h1>
        <p>
          Discover workshops, hackathons, tech talks and cultural events
        </p>

        <div className="welcome-links">
          <Link to="/events">Explore Events</Link>
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="section">
        <h2>🔥 Featured Events</h2>

        <div className="event-grid">
          {["Hackathon 2026", "Tech Talk", "UI/UX Workshop"].map((event, i) => (
            <div className="event-card" key={i}>
              <div className="event-image">
                <span>🎯</span>
              </div>

              <h3>{event}</h3>
              <p>📅 Jan {20 + i}, 2026</p>
              <p className="event-desc">
                Join us for an exciting experience and hands-on learning.
              </p>

              <Link to={`/events`} className="btn small">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <h2>🎯 Browse by Category</h2>

        <div className="categories">
          <span>💻 Tech</span>
          <span>🎨 Cultural</span>
          <span>🎓 Workshop</span>
          <span>🏆 Competition</span>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="section">
        <h2>📆 Upcoming Events</h2>

        <div className="upcoming">
          <div>
            <strong>Hackathon 2026</strong>
            <p>📍18 April, 2026 Auditorium • 🕘 10 AM</p>
          </div>

          <div>
            <strong>AI Tech Talk</strong>
            <p>📍19 April, 2026 Seminar Hall • 🕓 4 PM</p>
          </div>

          <div>
            <strong>Design Workshop</strong>
            <p>📍2 April, 2026 Lab 2 • 🕑 2 PM</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to be part of something amazing?</h2>
        <Link to="/events" className="btn primary">
          Browse All Events 🚀
        </Link>
      </section>

    </div>
  );
};

export default Dashboard;
