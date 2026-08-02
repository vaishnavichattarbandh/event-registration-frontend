import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Save user/student session details and full name
    localStorage.setItem("userToken", "student-auth-token");
    localStorage.setItem("userRole", "student");
    localStorage.setItem("userName", formData.fullName); // Saves name for Navbar & Dashboard greeting

    // 2. Redirect user to their dashboard
    navigate("/user/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-badge">🎓</div>
          <h2>Create Account</h2>
          <p>Join Aurora Event Hub to explore and register for events</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@university.edu"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label>Department / Branch</label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Are you an admin? <Link to="/admin/login">Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;