import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";
import { buildAntibioticAlerts, formatMedicineDate } from "../utils/medicine.js";
import { getStoredMedicines, getStoredRecords } from "../utils/storage.js";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const records = getStoredRecords(user.email);
  const medicines = getStoredMedicines(user.email);
  const antibioticAlerts = buildAntibioticAlerts(medicines);
  const latestRecord = records[0];
  const latestMedicine = medicines[0];

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Dashboard overview</p>
            <h1>Track uploads, medicine entries, and antibiotic awareness in one place.</h1>
            <p className="section-copy">
              This dashboard now follows the logged-in account only, so each person sees their own uploads,
              medicine timeline, and repeat-antibiotic alerts.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          <article className="info-card">
            <h3>Latest file</h3>
            <p>{latestRecord ? latestRecord.name : "No file uploaded yet."}</p>
          </article>
          <article className="info-card">
            <h3>Medicine log</h3>
            <p>{medicines.length ? `${medicines.length} entries saved` : "No medicine entry added yet."}</p>
          </article>
          <article className="info-card">
            <h3>Antibiotic watch</h3>
            <p>
              {antibioticAlerts.length
                ? antibioticAlerts[0].message
                : "No repeated antibiotic pattern has been detected in this account."}
            </p>
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
              <p>Upload the newest prescription, report, or bill first so the document timeline stays current.</p>
            </div>
            <div className="story-point">
              <span className="story-point__mark" />
              <p>Add medicine name, dose, and date for prescription or over-the-counter entries.</p>
            </div>
            <div className="story-point">
              <span className="story-point__mark" />
              <p>Use Analysis to check whether the same antibiotic is being repeated too often.</p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Current snapshot</p>
              <h2>What deserves attention now</h2>
            </div>
          </div>

          <div className="feature-grid">
            <article className="info-card">
              <h3>Latest medicine</h3>
              <p>
                {latestMedicine
                  ? `${latestMedicine.name} • ${latestMedicine.dose} • ${formatMedicineDate(latestMedicine.takenOn)}`
                  : "No medicine has been saved yet."}
              </p>
            </article>
            <article className="info-card">
              <h3>Total records</h3>
              <p>{records.length}</p>
            </article>
            <article className="info-card">
              <h3>Next action</h3>
              <p>
                {records.length || medicines.length
                  ? "Review the Records page for search and antibiotic alerts."
                  : "Upload your first file or save your first medicine entry to begin."}
              </p>
            </article>
          </div>
        </section>
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
    </div>
  );
}

export default DashboardPage;
