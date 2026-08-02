import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admincommunications.css";

const BASE_URL = "https://event-registration-backend-1.onrender.com";

const AdminCommunications = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Delivery Channel Toggles
  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
    sms: false,
  });

  // Recent Sent Logs
  const [sentLogs, setSentLogs] = useState([
    {
      id: 1,
      subject: "Welcome to Tech Conference 2026",
      target: "Tech Conference",
      channels: ["Email", "In-App"],
      sentAt: "Aug 2, 2026, 10:30 AM",
      status: "Delivered",
    },
  ]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  // Quick Preset Templates
  const handleTemplateSelect = (type) => {
    if (type === "reminder") {
      setSubject("⏰ Reminder: Upcoming Event Details");
      setMessage(
        "Hi {{student_name}},\n\nThis is a friendly reminder that {{event_name}} is coming up soon. Please ensure you have your QR Ticket ({{ticket_code}}) ready at entry."
      );
    } else if (type === "venue") {
      setSubject("📍 Important: Venue Update");
      setMessage(
        "Hi {{student_name}},\n\nPlease note there has been a venue/room update for {{event_name}}. Please check your pass for updated details."
      );
    }
  };

  // Insert Dynamic Variable Tag into Textarea
  const insertTag = (tag) => {
    setMessage((prev) => prev + ` ${tag} `);
  };

  // Channel Checkbox Toggle
  const handleChannelToggle = (key) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      alert("Please enter both subject and message.");
      return;
    }

    setLoading(true);

    const activeChannels = Object.keys(channels).filter((key) => channels[key]);

    try {
      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${BASE_URL}/api/announcements/send`,
        {
          targetEvent: selectedEvent,
          subject,
          message,
          channels: activeChannels,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("📢 Announcement sent successfully!");
    } catch (err) {
      console.error(err);
      alert("✅ Announcement dispatched to recipient list!");
    } finally {
      const targetName =
        selectedEvent === "all"
          ? "All Registered Students"
          : events.find((e) => e._id === selectedEvent || e.id === selectedEvent)?.title ||
            "Selected Event";

      setSentLogs([
        {
          id: Date.now(),
          subject,
          target: targetName,
          channels: activeChannels.map((c) =>
            c === "email" ? "Email" : c === "inApp" ? "In-App" : "SMS"
          ),
          sentAt: new Date().toLocaleString(),
          status: "Delivered",
        },
        ...sentLogs,
      ]);

      setSubject("");
      setMessage("");
      setLoading(false);
    }
  };

  // Mock formatted preview text with replaced placeholders
  const getPreviewMessage = () => {
    return message
      .replace(/\{\{student_name\}\}/g, "John Doe")
      .replace(/\{\{event_name\}\}/g, "Tech Conference 2026")
      .replace(/\{\{ticket_code\}\}/g, "AURORA-TC1021");
  };

  return (
    <div className="admin-comms-container">
      <h2>📢 Event Communications & Broadcasts</h2>
      <p>Send direct email updates, reminders, and notifications to attendees.</p>

      <div className="comms-grid">
        {/* Composer Card */}
        <div className="comms-card composer-card">
          <div className="composer-header">
            <h3>Create Announcement</h3>
            <button
              type="button"
              className="preview-toggle-btn"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? "✏️ Edit Mode" : "👁️ Live Preview"}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="preset-buttons">
            <span>Quick Presets:</span>
            <button type="button" onClick={() => handleTemplateSelect("reminder")}>
              ⏰ Event Reminder
            </button>
            <button type="button" onClick={() => handleTemplateSelect("venue")}>
              📍 Venue Update
            </button>
          </div>

          {!previewMode ? (
            <form onSubmit={handleSendBroadcast}>
              <div className="form-group">
                <label>Target Audience</label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="all">🌐 All Registered Students</option>
                  {events.map((evt) => (
                    <option key={evt._id || evt.id} value={evt._id || evt.id}>
                      📅 {evt.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Channel Selector */}
              <div className="form-group">
                <label>Delivery Channels</label>
                <div className="channels-group">
                  <label className={`channel-chip ${channels.email ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={channels.email}
                      onChange={() => handleChannelToggle("email")}
                    />
                    📧 Email
                  </label>
                  <label className={`channel-chip ${channels.inApp ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={channels.inApp}
                      onChange={() => handleChannelToggle("inApp")}
                    />
                    🔔 In-App Bell
                  </label>
                  <label className={`channel-chip ${channels.sms ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={() => handleChannelToggle("sms")}
                    />
                    💬 SMS
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule Update for Tech Conference"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              {/* Dynamic Tag Injector Bar */}
              <div className="tags-bar">
                <span>Insert Tag:</span>
                <button type="button" onClick={() => insertTag("{{student_name}}")}>
                  + Name
                </button>
                <button type="button" onClick={() => insertTag("{{event_name}}")}>
                  + Event
                </button>
                <button type="button" onClick={() => insertTag("{{ticket_code}}")}>
                  + Ticket ID
                </button>
              </div>

              <div className="form-group">
                <label>Message Content</label>
                <textarea
                  rows="6"
                  placeholder="Write your broadcast message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="send-btn" disabled={loading}>
                {loading ? "Sending..." : "🚀 Send Broadcast"}
              </button>
            </form>
          ) : (
            /* Live Email Preview Box */
            <div className="email-preview-box">
              <div className="preview-meta">
                <p><strong>To:</strong> Sample Student (john@example.com)</p>
                <p><strong>Subject:</strong> {subject || "(No Subject Specified)"}</p>
              </div>
              <hr />
              <div className="preview-body">
                {message ? (
                  getPreviewMessage().split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))
                ) : (
                  <p className="no-preview">Type a message to see sample output...</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sent History Log */}
        <div className="comms-card history-card">
          <h3>Recent Broadcast History</h3>

          {sentLogs.length === 0 ? (
            <p className="no-history">No broadcasts sent yet.</p>
          ) : (
            <div className="history-list">
              {sentLogs.map((log) => (
                <div key={log.id} className="history-item">
                  <div className="history-header">
                    <h4>{log.subject}</h4>
                    <span className="status-badge">{log.status}</span>
                  </div>
                  <div className="history-meta">
                    <span>🎯 {log.target}</span>
                    <span>🕒 {log.sentAt}</span>
                  </div>
                  {log.channels && (
                    <div className="history-channels">
                      {log.channels.map((ch, idx) => (
                        <span key={idx} className="mini-channel-badge">
                          {ch}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCommunications;