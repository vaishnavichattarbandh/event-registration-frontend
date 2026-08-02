import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/adminqrcheckin.css";

const AdminQRCheckin = () => {
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    // Initialize html5-qrcode scanner inside 'qr-reader' div
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      handleCheckIn(decodedText);
    }

    function onScanError(err) {
      // Ignore routine scan frame failures
    }

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
    };
  }, []);

  // Check-in Processing Logic
  const handleCheckIn = (code) => {
    const ticketId = code.trim();
    if (!ticketId) return;

    // Simulate verification check (or match against backend/localStorage)
    const newEntry = {
      code: ticketId,
      time: new Date().toLocaleTimeString(),
      status: "Valid Pass",
    };

    setScanResult({
      success: true,
      ticketCode: ticketId,
      message: "Pass Verified! Attendance Marked.",
    });

    setRecentScans((prev) => [newEntry, ...prev.slice(0, 4)]);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    handleCheckIn(manualCode);
    setManualCode("");
  };

  return (
    <div className="qr-checkin-container">
      <h2>📷 Event Entry Check-in</h2>
      <p>Scan student attendee QR codes or enter Ticket ID manually.</p>

      <div className="checkin-grid">
        {/* Left: Camera Scanner */}
        <div className="scanner-box">
          <h3>Scan Pass</h3>
          <div id="qr-reader"></div>

          {/* Manual Input Fallback */}
          <form className="manual-form" onSubmit={handleManualSubmit}>
            <input
              type="text"
              placeholder="Or enter Ticket ID manually..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button type="submit">Verify Pass</button>
          </form>
        </div>

        {/* Right: Verification Status & Feed */}
        <div className="status-box">
          <h3>Verification Result</h3>
          
          {scanResult ? (
            <div className={`result-card ${scanResult.success ? "success" : "error"}`}>
              <h4>{scanResult.success ? "✅ VALID TICKET" : "❌ INVALID TICKET"}</h4>
              <p><strong>Ticket ID:</strong> <code>{scanResult.ticketCode}</code></p>
              <p>{scanResult.message}</p>
            </div>
          ) : (
            <div className="result-card idle">
              <p>Point camera at student QR code to verify pass.</p>
            </div>
          )}

          {/* Recent Scans List */}
          <div className="recent-scans">
            <h4>Recent Check-ins</h4>
            {recentScans.length === 0 ? (
              <p className="no-scans">No scans recorded yet this session.</p>
            ) : (
              <ul>
                {recentScans.map((scan, idx) => (
                  <li key={idx}>
                    <span>🎟️ <code>{scan.code}</code></span>
                    <span className="scan-time">{scan.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQRCheckin;