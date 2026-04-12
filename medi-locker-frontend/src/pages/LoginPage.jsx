import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReportAnimation from "../components/ReportAnimation.jsx";
import useAuth from "../context/useAuth.js";
import { getStoredAccount } from "../utils/storage.js";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  const handleLogin = (event) => {
    event.preventDefault();

    const account = getStoredAccount();

    if (!account) {
      setError("Create an account first from the signup page.");
      return;
    }

    if (account.email !== email || account.password !== password) {
      setError("The email or password does not match your registered account.");
      return;
    }

    login(account.sessionProfile);
    navigate("/");
  };

  return (
    <section className="auth-layout">
      <div className="auth-stage">
        <div className="auth-stage__panel auth-stage__panel--intro">
          <p className="section-tag">Welcome back</p>
          <h1>Login to your MediLocker account</h1>
          <p className="section-copy">Use the same details you created during signup. Your home page will show your profile right away.</p>
          <ReportAnimation compact />
        </div>

        <div className="auth-card auth-stage__panel">
          <form className="auth-form" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
              />
            </label>

            {error ? <p className="form-message form-message--error">{error}</p> : null}

            <button className="button button--primary button--full" type="submit">
              Login
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create your account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
