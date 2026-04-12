import { useNavigate } from "react-router-dom";
import { getStoredRecords } from "../utils/storage.js";

function DashboardPage() {
  const navigate = useNavigate();
  const records = getStoredRecords();
  const latestRecord = records[0];

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Dashboard overview</p>
            <h1>Track uploads, recent activity, and the next best action.</h1>
            <p className="section-copy">This dashboard now follows the same richer website rhythm as the rest of the product instead of feeling like a blank inner page.</p>
          </div>
        </div>

        <div className="feature-grid">
          <article className="info-card">
            <h3>Latest file</h3>
            <p>{latestRecord ? latestRecord.name : "No file uploaded yet."}</p>
          </article>
          <article className="info-card">
            <h3>Total records</h3>
            <p>{records.length}</p>
          </article>
          <article className="info-card">
            <h3>Next action</h3>
            <p>{records.length ? "Review analysis guidance for your newest upload." : "Upload your first medical report to begin."}</p>
          </article>
        </div>
      </section>

      <section className="split-layout">
        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Checklist</p>
              <h2>Recommended order for a smooth workflow</h2>
            </div>
          </div>

          <div className="story-panel__stack">
            <div className="story-point">
              <span className="story-point__mark" />
              <p>Upload the newest PDF or image first so the records page stays current.</p>
            </div>
            <div className="story-point">
              <span className="story-point__mark" />
              <p>Open Records and verify category, date, and notes.</p>
            </div>
            <div className="story-point">
              <span className="story-point__mark" />
              <p>Use Analysis to review what should be checked next.</p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Actions</p>
              <h2>Go directly to the next page</h2>
            </div>
          </div>

          <div className="cta-row">
            <button className="button button--primary" onClick={() => navigate("/upload")} type="button">
              Upload File
            </button>
            <button className="button button--soft" onClick={() => navigate("/records")} type="button">
              View Records
            </button>
            <button className="button button--ghost" onClick={() => navigate("/analysis")} type="button">
              Open Analysis
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default DashboardPage;
