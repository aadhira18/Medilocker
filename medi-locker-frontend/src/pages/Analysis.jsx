import { getStoredRecords } from "../utils/storage.js";

function Analysis() {
  const records = getStoredRecords();
  const latestRecord = records[0];

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Analysis workspace</p>
            <h1>Review what to do after each upload</h1>
            <p className="section-copy">This page keeps the guidance visible from the left menu, even before a real AI backend is connected.</p>
          </div>
        </div>

        <div className="analysis-grid">
          <article className="info-card">
            <h3>Latest uploaded file</h3>
            <p>{latestRecord ? latestRecord.name : "No file uploaded yet."}</p>
            <span className="record-chip">{latestRecord ? latestRecord.category : "Waiting for upload"}</span>
          </article>

          <article className="info-card">
            <h3>Suggested next step</h3>
            <p>{latestRecord ? "Open your records page and verify the file details, then review doctor notes or test values." : "Start from Upload File to create your first record entry."}</p>
          </article>

          <article className="info-card">
            <h3>Guideline reminder</h3>
            <p>Keep each report category clear so future analysis and doctor sharing stays easy to follow.</p>
          </article>
        </div>
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
            <p>Make sure the report is saved under the correct type before you rely on it later.</p>
          </article>
          <article className="process-card">
            <span className="process-card__eyebrow">Review 2</span>
            <h3>Compare against previous files</h3>
            <p>Use the records page to see whether this result belongs in an ongoing treatment timeline.</p>
          </article>
          <article className="process-card">
            <span className="process-card__eyebrow">Review 3</span>
            <h3>Prepare for the doctor visit</h3>
            <p>Keep a short note about symptoms, dates, or questions so the uploaded file becomes more useful.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Analysis;
