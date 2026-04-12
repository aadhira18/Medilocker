import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* TOP BAR */}
      <div className="topbar">
        <span>ISO 27001 & 9001 Certified</span>
        <span>📧 care@medilocker.com</span>
        <span>📞 022-12345678</span>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <h2 className="logo">MediLocker®</h2>

        <div className="nav-links">
          <span>Health Checkups</span>
          <span>For Individuals</span>
          <span>Resources</span>
        </div>

        <div>
          <button onClick={() => navigate("/login")} className="btn">
          Login
          </button>
          <button onClick={() => navigate("/signup")} className="btn-outline">
            Register
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-text">
          <h1>MediLocker®</h1>

          <p>
            MediLocker is a secure AI-driven platform that helps you store,
            manage and access your medical records anytime. It allows easy
            sharing with doctors and provides insights from your health data.
          </p>

          <button onClick={() => navigate("/signup")} className="primary-btn">
            Get Started
          </button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966480.png"
          alt="health"
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="section">
        <h2>Let's understand how it works</h2>

        <div className="steps">
          <div className="card">
            <h3>Step 1</h3>
            <p>Upload your medical reports</p>
          </div>

          <div className="card">
            <h3>Step 2</h3>
            <p>Organize by family & category</p>
          </div>

          <div className="card">
            <h3>Step 3</h3>
            <p>Access anytime & share with doctors</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2026 MediLocker | Your Health, Our Priority</p>
      </div>

    </div>
  );
}

export default Home;