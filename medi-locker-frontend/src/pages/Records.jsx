import { getStoredRecords } from "../utils/storage.js";

function Records() {
  const records = getStoredRecords();

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Records library</p>
            <h1>All uploaded medical files</h1>
            <p className="section-copy">Your uploaded file metadata appears here so you can review it anytime from the left menu.</p>
          </div>
        </div>

        {records.length ? (
          <div className="record-list">
            {records.map((record) => (
              <article className="record-card" key={record.id}>
                <div>
                  <span className="record-chip">{record.category}</span>
                  <h3>{record.name}</h3>
                  <p>{record.note || "No extra notes added for this upload."}</p>
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
            <p>Use the Upload File menu item to add your first medical document.</p>
          </div>
        )}
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-tag">Helpful reminder</p>
            <h2>Keep the record list meaningful</h2>
          </div>
        </div>

        <div className="feature-grid">
          <article className="info-card">
            <h3>Use clear categories</h3>
            <p>Separate scans, prescriptions, and lab results so the record timeline stays easy to browse.</p>
          </article>
          <article className="info-card">
            <h3>Add notes when needed</h3>
            <p>Short notes make it much easier to remember why a file was uploaded or what changed.</p>
          </article>
          <article className="info-card">
            <h3>Review after upload</h3>
            <p>Visit the analysis page after every new file so the next action remains clear.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Records;
