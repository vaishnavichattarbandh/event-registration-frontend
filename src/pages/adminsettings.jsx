import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/adminsettings.css";

const BASE_URL = "https://event-registration-backend-1.onrender.com"; // Replace with process.env.REACT_APP_API_URL if using env variables

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@aurora.edu",
    role: "Event Coordinator",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newRegistrationAlert: true,
    checkInAlert: false,
  });

  const [system, setSystem] = useState({
    maxCapacityDefault: 100,
    allowGuestRegistration: false,
    autoApprovePasses: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch saved settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/settings`);
      if (res.data) {
        if (res.data.adminProfile) setProfile(res.data.adminProfile);
        if (res.data.system) setSystem(res.data.system);
        if (res.data.notifications) setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError("Failed to load settings from server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Save settings to the backend
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");

      await axios.put(
        `${BASE_URL}/api/settings`,
        {
          adminProfile: profile,
          system,
          notifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError(err.response?.data?.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-settings-container"><p>Loading settings...</p></div>;
  }

  return (
    <div className="admin-settings-container">
      <h2>⚙️ Portal Settings & Preferences</h2>
      <p>Manage system configuration, admin profile, and notification preferences.</p>

      {saved && <div className="toast-success">✅ Settings updated successfully!</div>}
      {error && <div className="toast-error">❌ {error}</div>}

      <form onSubmit={handleSave} className="settings-grid">
        {/* Profile Card */}
        <div className="settings-card">
          <h3>👤 Admin Profile</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Role / Title</label>
            <input type="text" value={profile.role} disabled className="disabled-input" />
          </div>
        </div>

        {/* System & Event Defaults */}
        <div className="settings-card">
          <h3>📅 Event & Portal Defaults</h3>
          <div className="form-group">
            <label>Default Event Seat Limit</label>
            <input
              type="number"
              value={system.maxCapacityDefault}
              onChange={(e) =>
                setSystem({ ...system, maxCapacityDefault: Number(e.target.value) })
              }
            />
          </div>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={system.autoApprovePasses}
                onChange={(e) =>
                  setSystem({ ...system, autoApprovePasses: e.target.checked })
                }
              />
              Auto-approve Student Ticket Passes
            </label>
          </div>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={system.allowGuestRegistration}
                onChange={(e) =>
                  setSystem({ ...system, allowGuestRegistration: e.target.checked })
                }
              />
              Allow Non-Student Guest Registrations
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <h3>🔔 Notification Preferences</h3>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) =>
                  setNotifications({ ...notifications, emailAlerts: e.target.checked })
                }
              />
              Email Broadcast System Active
            </label>
          </div>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={notifications.newRegistrationAlert}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    newRegistrationAlert: e.target.checked,
                  })
                }
              />
              Notify on New Event Registrations
            </label>
          </div>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={notifications.checkInAlert}
                onChange={(e) =>
                  setNotifications({ ...notifications, checkInAlert: e.target.checked })
                }
              />
              Live Check-In Audio Beep at Door
            </label>
          </div>
        </div>

        {/* Security / Password */}
        <div className="settings-card">
          <h3>🔒 Security & Password</h3>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "⏳ Saving..." : "💾 Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;