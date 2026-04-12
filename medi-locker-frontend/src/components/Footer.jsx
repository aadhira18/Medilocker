import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell-band site-footer__content">
        <div className="site-footer__brand">
          <strong>MediLocker</strong>
          <p>Premium digital storage for lab reports, prescriptions, scans, and doctor-ready summaries.</p>
        </div>

        <div className="site-footer__links">
          <div>
            <span className="site-footer__label">Explore</span>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload">Upload</Link>
          </div>

          <div>
            <span className="site-footer__label">Why people use it</span>
            <span>Family-ready records</span>
            <span>Guided analysis flow</span>
            <span>Privacy-first storage</span>
          </div>

          <div>
            <span className="site-footer__label">Contact</span>
            <span>care@medilocker.com</span>
            <span>24x7 guided support</span>
            <span>Built for modern health journeys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
