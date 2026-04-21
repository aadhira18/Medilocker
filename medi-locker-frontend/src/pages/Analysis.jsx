import useAuth from "../context/useAuth.js";
import { buildAntibioticAlerts, formatMedicineDate } from "../utils/medicine.js";
import { getStoredMedicines, getStoredRecords } from "../utils/storage.js";

function Analysis() {
  const { user } = useAuth();
  const records = getStoredRecords(user.email);
  const medicines = getStoredMedicines(user.email);
  const latestRecord = records[0];
  const latestMedicine = medicines[0];
  const antibioticAlerts = buildAntibioticAlerts(medicines);

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Analysis workspace</p>
            <h1>Review your uploads and repeated antibiotic usage</h1>
            <p className="section-copy">
              This page keeps the guidance visible from the left menu while also surfacing the medicine
              history saved for the current account.
            </p>
          </div>
        </div>

        <div className="analysis-grid">
          <article className="info-card">
            <h3>Latest uploaded file</h3>
            <p>{latestRecord ? latestRecord.name : "No file uploaded yet."}</p>
            <span className="record-chip">{latestRecord ? latestRecord.category : "Waiting for upload"}</span>
          </article>

          <article className="info-card">
            <h3>Latest medicine entry</h3>
            <p>
              {latestMedicine
                ? `${latestMedicine.name} • ${latestMedicine.dose} • ${formatMedicineDate(latestMedicine.takenOn)}`
                : "No medicine saved yet."}
            </p>
          </article>

          <article className="info-card">
            <h3>Antibiotic alert status</h3>
            <p>
              {antibioticAlerts.length
                ? `${antibioticAlerts.length} repeat-use alert${antibioticAlerts.length > 1 ? "s" : ""} detected`
                : "No repeat antibiotic signal detected right now."}
            </p>
          </article>
        </div>
      </section>

      <section className="split-layout">
        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Alerts</p>
              <h2>What to review carefully</h2>
            </div>
          </div>

          {antibioticAlerts.length ? (
            <div className="alert-list">
              {antibioticAlerts.map((alert) => (
                <article
                  className={`alert-card ${alert.severity === "high" ? "alert-card--high" : ""}`}
                  key={alert.name}
                >
                  <span className="record-chip record-chip--alert">Antibiotic warning</span>
                  <h3>{alert.name}</h3>
                  <p>{alert.message}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No active warning cards</h3>
              <p>Add medicine dates consistently so MediLocker can warn when the same antibiotic appears too often.</p>
            </div>
          )}
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Suggested flow</p>
              <h2>Use this page as your review checklist</h2>
            </div>
          </div>

          <div className="process-grid process-grid--member">
            <article className="process-card">
              <span className="process-card__eyebrow">Review 1</span>
              <h3>Check the uploaded category</h3>
              <p>Make sure the file is saved under the correct type before you rely on it later.</p>
            </article>
            <article className="process-card">
              <span className="process-card__eyebrow">Review 2</span>
              <h3>Confirm medicine name and dose</h3>
              <p>Use prescription text first, then medical bill text, and correct the medicine manually if needed.</p>
            </article>
            <article className="process-card">
              <span className="process-card__eyebrow">Review 3</span>
              <h3>Question repeated antibiotics</h3>
              <p>When the same antibiotic appears frequently, use that as a signal to discuss safe use with a doctor.</p>
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Analysis;
