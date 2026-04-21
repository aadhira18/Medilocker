import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReportAnimation from "../components/ReportAnimation.jsx";
import useAuth from "../context/useAuth.js";
import { getStoredAccountByEmail, saveStoredAccount } from "../utils/storage.js";

function buildSessionProfile(name, email) {
  const today = new Date();
  const memberSince = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const patientId = `ML-${name.replace(/\s+/g, "").slice(0, 3).toUpperCase()}-${String(today.getTime()).slice(-4)}`;

  return {
    email,
    memberSince,
    name,
    patientId,
  };
}

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  const handleSignup = (event) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setError("Please fill in your name, email, and password.");
      return;
    }

    if (getStoredAccountByEmail(trimmedEmail)) {
      setError("An account with this email already exists. Please login instead.");
      return;
    }

    const sessionProfile = buildSessionProfile(trimmedName, trimmedEmail);

    saveStoredAccount({
      email: trimmedEmail,
      name: trimmedName,
      password,
      sessionProfile,
    });
    login(sessionProfile);
    navigate("/");
  };

  return (
    <section className="auth-layout">
      <div className="auth-stage">
        <div className="auth-stage__panel auth-stage__panel--intro">
          <p className="section-tag">Create account</p>
          <h1>Sign up and go straight to your home dashboard</h1>
          <p className="section-copy">
            After signup, MediLocker redirects you to the home page and replaces the login buttons with your profile details.
          </p>
          <ReportAnimation compact />
        </div>

        <div className="auth-card auth-stage__panel">
          <form className="auth-form" onSubmit={handleSignup}>
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
              />
            </label>

            {error ? <p className="form-message form-message--error">{error}</p> : null}

            <button className="button button--primary button--full" type="submit">
              Create account
            </button>
          </form>

          <p className="auth-switch">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
