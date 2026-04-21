import { useNavigate } from "react-router-dom";
import ReportAnimation from "../components/ReportAnimation.jsx";
import useAuth from "../context/useAuth.js";
import { buildAntibioticAlerts } from "../utils/medicine.js";
import { getStoredMedicines, getStoredRecords } from "../utils/storage.js";

const publicFeatures = [
  {
    title: "Store every report safely",
    description: "Keep lab reports, scans, prescriptions, and discharge summaries together in one secure locker.",
  },
  {
    title: "Share with doctors faster",
    description: "Open the records you need in seconds instead of searching through different folders or chats.",
  },
  {
    title: "Review guided next steps",
    description: "Use the dashboard and analysis pages to stay organized after each upload or medicine entry.",
  },
  {
    title: "Track medicine safety",
    description: "Build a cleaner medicine timeline so repeated antibiotics are easier to notice and discuss.",
  },
];

const quickActions = [
  {
    title: "Upload a new file",
    description: "Add your latest report and keep your timeline updated.",
    route: "/upload",
  },
  {
    title: "Open record library",
    description: "See all uploaded documents with dates and categories.",
    route: "/records",
  },
  {
    title: "View analysis guide",
    description: "Check what to review after every new medical document.",
    route: "/analysis",
  },
];

const processSteps = [
  {
    eyebrow: "Step 1",
    title: "Upload reports in one calm flow",
    description: "Bring together prescriptions, scans, and lab reports with clean categories instead of scattered files.",
  },
  {
    eyebrow: "Step 2",
    title: "Organize by date and person",
    description: "Create a dependable health timeline that is easy to revisit before appointments or follow-ups.",
  },
  {
    eyebrow: "Step 3",
    title: "Review and act faster",
    description: "Use the dashboard, records, and analysis view to understand what needs attention next.",
  },
];

const storyPanels = [
  "Structured uploads for reports, scans, and prescriptions",
  "Fast records search from one familiar dashboard",
  "Ready-to-review summaries for doctor visits and family care",
];

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const records = user ? getStoredRecords(user.email) : [];
  const medicines = user ? getStoredMedicines(user.email) : [];
  const antibioticAlerts = buildAntibioticAlerts(medicines);
  const recentRecords = records.slice(0, 3);

  if (!isAuthenticated) {
    return (
      <div className="content-stack content-stack--landing">
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="section-tag">Digital care workspace</p>
            <h1>Medical records, designed like a premium health website.</h1>
            <p className="section-copy">
              MediLocker helps families store reports, organize them cleanly, and return to important health
              documents without the usual confusion of files, chats, and folders.
            </p>
            <div className="cta-row">
              <button className="button button--primary" onClick={() => navigate("/signup")} type="button">
                Create Account
              </button>
              <button className="button button--ghost" onClick={() => navigate("/login")} type="button">
                Login
              </button>
            </div>
            <div className="hero-metrics">
              <div className="metric-pill">
                <strong>24x7</strong>
                <span>access to organized records</span>
              </div>
              <div className="metric-pill">
                <strong>1 place</strong>
                <span>for family health files</span>
              </div>
              <div className="metric-pill">
                <strong>3 steps</strong>
                <span>upload, review, analyze</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-card">
            <ReportAnimation />
            <div className="hero-visual-card__note">
              <span className="hero-visual-card__tag">Full Analysis </span>
              <p>One stop solution for your medical records</p>
            </div>
          </div>
        </section>

        <section className="trust-ribbon">
          <div className="trust-ribbon__row">
            <span>Privacy-first dashboard</span>
            <span>Doctor-ready records</span>
            <span>Family health history</span>
            <span>Clean uploads and guided review</span>
          </div>
        </section>

        <section className="page-section page-section--soft" id="workflow">
          <div className="section-heading section-heading--center">
            <div>
              <p className="section-tag">How it works</p>
              <h2>Long-form product storytelling, without making the text oversized.</h2>
            </div>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.title}>
                <span className="process-card__eyebrow">{step.eyebrow}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story-layout">
          <article className="story-panel">
            <div className="story-panel__copy">
              <p className="section-tag">Built for real use</p>
              <h2>A proper website rhythm instead of one short screen.</h2>
              <p className="section-copy">
                The page is now intentionally longer and more structured, following the kind of layout hierarchy users
                expect from established health platforms: hero, trust strip, workflow, feature detail, and strong
                footer closure.
              </p>
            </div>

            <div className="story-panel__stack">
              {storyPanels.map((item) => (
                <div className="story-point" key={item}>
                  <span className="story-point__mark" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Platform highlights</p>
              <h2>Everything stays simple from the first visit.</h2>
            </div>
          </div>

          <div className="feature-grid">
            {publicFeatures.map((feature) => (
              <article className="info-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner">
          <div>
            <p className="section-tag">Start now</p>
            <h2>Create your account and land in a polished home dashboard.</h2>
          </div>
          <button className="button button--primary" onClick={() => navigate("/signup")} type="button">
            Get Started
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="content-stack">
      <section className="landing-hero landing-hero--member">
        <div className="hero-copy">
          <p className="section-tag">Welcome back</p>
          <h1>{user.name}, your locker is ready for the next report.</h1>
          <p className="section-copy">
            You are signed in with <strong>{user.email}</strong>. This account now shows only its own uploads and
            medicine history, while the left menu keeps upload, records, and analysis one click away.
          </p>
          <div className="cta-row">
            <button className="button button--primary" onClick={() => navigate("/upload")} type="button">
              Upload File
            </button>
            <button className="button button--ghost" onClick={() => navigate("/analysis")} type="button">
              See Analysis
            </button>
          </div>
          <div className="member-chips">
            <span>Patient ID: {user.patientId}</span>
            <span>Member since {user.memberSince}</span>
          </div>
        </div>

        <div className="hero-visual-card hero-visual-card--member">
          <ReportAnimation compact />
          <div className="profile-panel">
            <div className="profile-panel__avatar">
              {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="profile-panel__details">
              <div>
                <span>Name</span>
                <strong>{user.name}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>
              <div>
                <span>Member Since</span>
                <strong>{user.memberSince}</strong>
              </div>
              <div>
                <span>Patient ID</span>
                <strong>{user.patientId}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total Uploads</span>
          <strong>{records.length}</strong>
        </article>
        <article className="stat-card">
          <span>Medicine Log</span>
          <strong>{medicines.length}</strong>
        </article>
        <article className="stat-card">
          <span>Antibiotic Watch</span>
          <strong>{antibioticAlerts.length ? `${antibioticAlerts.length} alert(s)` : "No repeat signal"}</strong>
        </article>
      </section>

      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Workflow</p>
            <h2>Use the left menu or follow the main flow below.</h2>
          </div>
        </div>

        <div className="process-grid process-grid--member">
          {processSteps.map((step) => (
            <article className="process-card" key={step.title}>
              <span className="process-card__eyebrow">{step.eyebrow}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-layout">
        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Quick actions</p>
              <h2>Jump into the areas you use most.</h2>
            </div>
          </div>

          <div className="feature-grid">
            {quickActions.map((action) => (
              <article className="info-card" key={action.title}>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <button className="button button--soft" onClick={() => navigate(action.route)} type="button">
                  Open
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Recent records</p>
              <h2>Latest uploads from your locker</h2>
            </div>
          </div>

          {recentRecords.length ? (
            <div className="record-list record-list--compact">
              {recentRecords.map((record) => (
                <article className="record-card" key={record.id}>
                  <div>
                    <span className="record-chip">{record.category}</span>
                    <h3>{record.name}</h3>
                    <p>{record.note || "Ready to review from the records page."}</p>
                  </div>

                  <div className="record-meta">
                    <span>{record.sizeLabel}</span>
                    <span>{record.uploadedAtLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No uploads yet</h3>
              <p>Use Upload File to create your first record and make this dashboard feel alive.</p>
            </div>
          )}
        </section>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-tag">Care guidance</p>
            <h2>Simple reminders that keep the workflow clean.</h2>
          </div>
        </div>

        <div className="feature-grid">
          {storyPanels.map((item) => (
            <article className="info-card" key={item}>
              <h3>{item}</h3>
              <p>
                {antibioticAlerts.length
                  ? antibioticAlerts[0].message
                  : "Built into the same premium workflow so medicine awareness stays visible without extra effort."}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
