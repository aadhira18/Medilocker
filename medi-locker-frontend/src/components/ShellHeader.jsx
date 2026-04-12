import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";

function ShellHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ML";

  return (
    <header className="site-header">
      <div className="shell-band site-header__content">
        <button className="brand-mark" onClick={() => navigate("/")} type="button">
          <span className="brand-mark__icon">ML</span>
          <span>
            <strong>MediLocker</strong>
            <small>Store reports, track care, review insights</small>
          </span>
        </button>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink className="site-nav__link" to="/" end>
            Home
          </NavLink>
          <NavLink className="site-nav__link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="site-nav__link" to="/upload">
            Upload
          </NavLink>
          <NavLink className="site-nav__link" to="/records">
            Records
          </NavLink>
          <NavLink className="site-nav__link" to="/analysis">
            Analysis
          </NavLink>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <div className="user-summary">
                <span className="user-summary__avatar">{initials}</span>
                <div className="user-summary__text">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
              </div>

              <button className="button button--ghost" onClick={handleLogout} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="button button--ghost" onClick={() => navigate("/login")} type="button">
                Login
              </button>
              <button className="button button--primary" onClick={() => navigate("/signup")} type="button">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default ShellHeader;
