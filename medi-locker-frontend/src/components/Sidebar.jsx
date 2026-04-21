import { NavLink } from "react-router-dom";
import useAuth from "../context/useAuth.js";

const menuItems = [
  { to: "/", label: "Home", badge: "HM" },
  { to: "/dashboard", label: "Dashboard", badge: "DB" },
  { to: "/upload", label: "Upload File", badge: "UP" },
  { to: "/records", label: "Records", badge: "RC" },
  { to: "/analysis", label: "Analysis", badge: "AI" },
];

function Sidebar() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <p className="section-tag">Signed In Profile</p>
        <h3>{user.name}</h3>
        <p className="sidebar-card__email">{user.email}</p>
        <div className="profile-details">
          <span>{user.memberSince}</span>
          <span>{user.patientId}</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            end={item.to === "/"}
          >
            <span className="sidebar-badge">{item.badge}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-card sidebar-card--soft">
        <p className="section-tag">Guidelines</p>
        <ul className="sidebar-notes">
          <li>Upload clear PDFs or photos for faster review.</li>
          <li>Keep prescriptions, reports, scans, and bills in separate categories.</li>
          <li>Save medicine name, dose, and date so antibiotic alerts can stay useful.</li>
          <li>Use the analysis page after every new upload to review next steps.</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
