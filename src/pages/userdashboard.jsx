import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import "../styles/userdashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [activeVenueModal, setActiveVenueModal] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedName = localStorage.getItem("userName");

    if (!token) {
      navigate("/signup");
      return;
    }

    if (storedName) {
      setUserName(storedName);
    }

    const saved = JSON.parse(localStorage.getItem("myRegistrations") || "null");
    if (saved && saved.length > 0) {
      setMyRegistrations(saved);
    } else {
      setMyRegistrations([
        {
          id: 1,
          title: "Tech Conference",
          date: "2026-10-21",
          location: "Hyderabad, India",
          ticketCode: "NEXUS-TC-1021",
          status: "Confirmed",
          venueDetails: "Convention Center, Hall A",
        },
      ]);
    }
  }, [navigate]);

  // Helper to generate dynamic Google Calendar links
  const getGoogleCalendarUrl = (item) => {
    const eventDate = item.date ? item.date.replace(/-/g, "") : "20261021";
    const startTime = `${eventDate}T090000Z`;
    const endTime = `${eventDate}T170000Z`;

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const text = `&text=${encodeURIComponent(item.title)}`;
    const details = `&details=${encodeURIComponent(
      `Pass ID: ${item.ticketCode} - Registered via Nexus Event Hub`
    )}`;
    const location = `&location=${encodeURIComponent(item.location || "Hyderabad, India")}`;
    const dates = `&dates=${startTime}/${endTime}`;

    return `${baseUrl}${text}${details}${location}${dates}`;
  };

  // Helper to calculate days remaining
  const getDaysRemaining = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past Event";
    if (diffDays === 0) return "Today!";
    if (diffDays === 1) return "Tomorrow!";
    return `In ${diffDays} days`;
  };

  // Copy Ticket Code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // PDF Export Pass Generator
  const handleDownloadPDF = (item) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [100, 150],
    });

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 100, 150, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("NEXUS EVENT PASS", 50, 18, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(51, 65, 85);
    doc.line(10, 24, 90, 24);

    doc.setFontSize(12);
    doc.setTextColor(96, 165, 250);
    doc.text(item.title, 50, 32, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`Attendee: ${userName}`, 12, 44);
    doc.text(`Date: ${item.date}`, 12, 52);
    doc.text(`Location: ${item.location}`, 12, 60);
    doc.text(`Pass ID: ${item.ticketCode}`, 12, 68);
    doc.text(`Status: ${item.status || "Confirmed"}`, 12, 76);

    const canvasElement = document.getElementById(`qr-canvas-${item.ticketCode}`);

    if (canvasElement) {
      const qrDataUrl = canvasElement.toDataURL("image/png");

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(28, 86, 44, 44, 3, 3, "F");
      doc.addImage(qrDataUrl, "PNG", 30, 88, 40, 40);
    }

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Scan QR Code at Venue Entry", 50, 138, { align: "center" });

    doc.save(`${item.ticketCode}-NexusPass.pdf`);
  };

  // Cancel Pass Handler
  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    const updated = myRegistrations.map((reg) =>
      reg.id === cancelTarget.id ? { ...reg, status: "Cancelled" } : reg
    );
    setMyRegistrations(updated);
    localStorage.setItem("myRegistrations", JSON.stringify(updated));
    setCancelTarget(null);
  };

  // Filter Registrations
  const filteredRegistrations = myRegistrations.filter((item) => {
    if (selectedTab === "all") return true;
    const eventDate = new Date(item.date);
    const today = new Date();
    if (selectedTab === "upcoming")
      return eventDate >= today && item.status !== "Cancelled";
    if (selectedTab === "past") return eventDate < today;
    return true;
  });

  return (
    <div className="dashboard-container">
      {/* Welcome Hero Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h2>Welcome back, {userName}! 👋</h2>
          <p>Manage your event passes and explore new campus events.</p>
        </div>
        <Link to="/events" className="explore-btn">
          Explore Events →
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric-card">
          <span className="metric-icon">🎟️</span>
          <div>
            <h3>{myRegistrations.length}</h3>
            <p>Registered Events</p>
          </div>
        </div>
        <div className="metric-card">
          <span className="metric-icon">🌟</span>
          <div>
            <h3>Active</h3>
            <p>Attendee Status</p>
          </div>
        </div>
        <div className="metric-card">
          <span className="metric-icon">📍</span>
          <div>
            <h3>Hyderabad</h3>
            <p>Primary Venue</p>
          </div>
        </div>
      </div>

      {/* Section Header & Tabs */}
      <div className="dashboard-section-header">
        <h3>Your Event Passes</h3>
        <div className="filter-tabs">
          <button
            className={`tab-btn ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => setSelectedTab("all")}
          >
            All
          </button>
          <button
            className={`tab-btn ${selectedTab === "upcoming" ? "active" : ""}`}
            onClick={() => setSelectedTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`tab-btn ${selectedTab === "past" ? "active" : ""}`}
            onClick={() => setSelectedTab("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* Ticket Pass List */}
      <div className="dashboard-section">
        {filteredRegistrations.length > 0 ? (
          <div className="tickets-grid">
            {filteredRegistrations.map((item, idx) => {
              const statusClass = (item.status || "Confirmed").toLowerCase();
              const daysLeftTag = getDaysRemaining(item.date);

              return (
                <div key={item.id || idx} className="ticket-card">
                  <div className="ticket-main-info">
                    <div className="ticket-header">
                      <div>
                        <h4>{item.title}</h4>
                        <span className="countdown-tag">⏳ {daysLeftTag}</span>
                      </div>
                      <span className={`status-badge status-${statusClass}`}>
                        ● {item.status || "Confirmed"}
                      </span>
                    </div>

                    <div className="ticket-details">
                      <p>
                        📅 <strong>Date:</strong> {item.date}
                      </p>
                      <p>
                        📍 <strong>Location:</strong> {item.location}{" "}
                        <button
                          className="map-link-btn"
                          onClick={() => setActiveVenueModal(item)}
                        >
                          [🗺️ Map]
                        </button>
                      </p>
                      <p className="pass-id-row">
                        🔑 <strong>Pass ID:</strong>{" "}
                        <code>{item.ticketCode}</code>
                        <button
                          className="copy-btn"
                          onClick={() => handleCopyCode(item.ticketCode)}
                          title="Copy Pass ID"
                        >
                          {copiedId === item.ticketCode ? "✓ Copied" : "📋 Copy"}
                        </button>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="ticket-actions">
                      <a
                        href={getGoogleCalendarUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn calendar-add-btn"
                      >
                        📅 Add to Calendar
                      </a>
                      <button
                        className="action-btn pdf-btn"
                        onClick={() => handleDownloadPDF(item)}
                      >
                        📄 Download Pass
                      </button>
                      {item.status !== "Cancelled" && (
                        <button
                          className="action-btn cancel-btn"
                          onClick={() => setCancelTarget(item)}
                        >
                          🚫 Cancel Pass
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Canvas QR Code */}
                  <div
                    className="qr-container"
                    onClick={() => setActiveQrModal(item)}
                    title="Click to enlarge QR code"
                  >
                    <div className="qr-wrapper">
                      <QRCodeCanvas
                        id={`qr-canvas-${item.ticketCode}`}
                        value={item.ticketCode || "NEXUS-PASS-001"}
                        size={84}
                        bgColor="#1e293b"
                        fgColor="#ffffff"
                        level="M"
                      />
                    </div>
                    <span className="qr-hint">🔍 TAP TO ENLARGE</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-box">
            <div className="empty-icon">🎟️</div>
            <h4>No Event Passes Found</h4>
            <p>You don't have any event registrations in this category.</p>
            <Link to="/events" className="browse-link">
              Explore Available Events →
            </Link>
          </div>
        )}
      </div>

      {/* QR Modal */}
      {activeQrModal && (
        <div className="qr-modal-overlay" onClick={() => setActiveQrModal(null)}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveQrModal(null)}
            >
              ✕
            </button>
            <h3>{activeQrModal.title}</h3>
            <p className="modal-subtitle">Present this code at entry</p>
            <div className="modal-qr-frame">
              <QRCodeSVG
                value={activeQrModal.ticketCode}
                size={220}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="H"
              />
            </div>
            <code className="modal-pass-code">{activeQrModal.ticketCode}</code>
          </div>
        </div>
      )}

      {/* Venue Modal */}
      {activeVenueModal && (
        <div
          className="qr-modal-overlay"
          onClick={() => setActiveVenueModal(null)}
        >
          <div
            className="qr-modal-content venue-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setActiveVenueModal(null)}
            >
              ✕
            </button>
            <h3>📍 Venue Information</h3>
            <p className="modal-subtitle">{activeVenueModal.title}</p>
            <div className="venue-info-box">
              <p>
                <strong>Location:</strong> {activeVenueModal.location}
              </p>
              <p>
                <strong>Hall/Zone:</strong>{" "}
                {activeVenueModal.venueDetails || "Main Auditorium"}
              </p>
              <div className="map-placeholder">
                🗺️ [Interactive Google Maps Embed Area]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="qr-modal-overlay" onClick={() => setCancelTarget(null)}>
          <div
            className="qr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Cancellation</h3>
            <p className="modal-subtitle">
              Are you sure you want to cancel your pass for{" "}
              <strong>{cancelTarget.title}</strong>?
            </p>
            <div className="modal-action-row">
              <button
                className="modal-confirm-btn"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel Pass
              </button>
              <button
                className="modal-cancel-btn"
                onClick={() => setCancelTarget(null)}
              >
                Keep Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;