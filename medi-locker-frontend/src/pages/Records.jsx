import { useState } from "react";
import useAuth from "../context/useAuth.js";
import {
  buildAntibioticAlerts,
  extractDose,
  formatMedicineDate,
  recognizeMedicineNames,
  resolveMedicineDetails,
} from "../utils/medicine.js";
import {
  getStoredMedicines,
  getStoredRecords,
  saveStoredMedicine,
} from "../utils/storage.js";

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

function Records() {
  const { user } = useAuth();
  const [records] = useState(() => getStoredRecords(user.email));
  const [medicines, setMedicines] = useState(() => getStoredMedicines(user.email));
  const [searchQuery, setSearchQuery] = useState("");
  const [recognitionSource, setRecognitionSource] = useState("Prescription");
  const [recognitionText, setRecognitionText] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [takenOn, setTakenOn] = useState(getTodayValue());
  const [sourceType, setSourceType] = useState("Over-the-counter medicine");
  const [note, setNote] = useState("");
  const [isMarkedAntibiotic, setIsMarkedAntibiotic] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const recognizedMedicines = recognizeMedicineNames(recognitionText);
  const suggestedDose = extractDose(recognitionText);
  const antibioticAlerts = buildAntibioticAlerts(medicines);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredMedicines = medicines.filter((medicine) => {
    if (!normalizedQuery) {
      return true;
    }

    return [
      medicine.name,
      medicine.dose,
      medicine.sourceType,
      medicine.recognitionSource,
      medicine.linkedRecordName,
      medicine.note,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
  const filteredRecords = records.filter((record) => {
    if (!normalizedQuery) {
      return true;
    }

    return [record.category, record.name, record.note, record.linkedMedicineName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const handleSaveMedicine = (event) => {
    event.preventDefault();
    setFormMessage("");
    setFormSuccess("");

    const medicineDetails = resolveMedicineDetails({
      isMarkedAntibiotic,
      medicineName,
      recognitionText,
    });
    const resolvedDose = dose.trim() || medicineDetails.suggestedDose;

    if (!medicineDetails.medicineName) {
      setFormMessage("Enter a medicine name or paste prescription or bill text so the app can recognize it.");
      return;
    }

    if (!resolvedDose) {
      setFormMessage("Please add the medicine dose so the record is meaningful later.");
      return;
    }

    if (!takenOn) {
      setFormMessage("Please choose the medicine date.");
      return;
    }

    const savedMedicine = {
      dose: resolvedDose,
      id: `medicine-${Date.now()}`,
      isAntibiotic: medicineDetails.isAntibiotic,
      linkedRecordName: "",
      name: medicineDetails.medicineName,
      note: note.trim(),
      recognitionSource,
      recognitionText: recognitionText.trim(),
      sourceType,
      takenOn,
    };

    const nextMedicines = saveStoredMedicine(user.email, savedMedicine);
    setMedicines(nextMedicines);
    setRecognitionSource("Prescription");
    setRecognitionText("");
    setMedicineName("");
    setDose("");
    setTakenOn(getTodayValue());
    setSourceType("Over-the-counter medicine");
    setNote("");
    setIsMarkedAntibiotic(false);
    setFormSuccess("Medicine saved to this account only.");
  };

  return (
    <div className="content-stack">
      <section className="page-section page-section--soft">
        <div className="section-heading">
          <div>
            <p className="section-tag">Records library</p>
            <h1>Private records and medicine history for {user.name}</h1>
            <p className="section-copy">
              Search this account&apos;s uploads and medicine entries together. Prescription text is checked
              first, and you can fall back to medical bill text or manual entry when recognition is unclear.
            </p>
          </div>
        </div>

        <div className="stats-grid stats-grid--records">
          <article className="stat-card">
            <span>Uploaded files</span>
            <strong>{records.length}</strong>
          </article>
          <article className="stat-card">
            <span>Medicine entries</span>
            <strong>{medicines.length}</strong>
          </article>
          <article className="stat-card">
            <span>Antibiotic alerts</span>
            <strong>{antibioticAlerts.length}</strong>
          </article>
        </div>

        <label className="field field--search">
          <span>Search medicines, dose, record name, or category</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by medicine name, uploaded file, dose, or source"
          />
        </label>
      </section>

      <section className="split-layout">
        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Medicine tracker</p>
              <h2>Add prescription or over-the-counter medicine</h2>
            </div>
          </div>

          <form className="upload-form" onSubmit={handleSaveMedicine}>
            <label className="field">
              <span>Recognition source</span>
              <select value={recognitionSource} onChange={(event) => setRecognitionSource(event.target.value)}>
                <option>Prescription</option>
                <option>Medical Bill</option>
                <option>Manual Entry</option>
              </select>
            </label>

            <label className="field">
              <span>Prescription or bill text</span>
              <textarea
                value={recognitionText}
                onChange={(event) => setRecognitionText(event.target.value)}
                placeholder="Paste text from the prescription or pharmacy bill"
                rows="4"
              />
            </label>

            {recognizedMedicines.length ? (
              <div className="suggestion-panel">
                <span className="suggestion-panel__label">Recognized medicines</span>
                <div className="suggestion-row">
                  {recognizedMedicines.map((medicine) => (
                    <button
                      className="button button--soft suggestion-button"
                      key={medicine.name}
                      onClick={() => setMedicineName(medicine.name)}
                      type="button"
                    >
                      {medicine.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="helper-text">
                If nothing is recognized, type the medicine manually and keep the dose and date for later review.
              </p>
            )}

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Medicine name</span>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(event) => setMedicineName(event.target.value)}
                  placeholder="Example: Azithromycin"
                />
              </label>

              <label className="field">
                <span>Dose</span>
                <input
                  type="text"
                  value={dose}
                  onChange={(event) => setDose(event.target.value)}
                  placeholder={suggestedDose || "Example: 500 mg"}
                />
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Date of medicine</span>
                <input type="date" value={takenOn} onChange={(event) => setTakenOn(event.target.value)} />
              </label>

              <label className="field">
                <span>Source type</span>
                <select value={sourceType} onChange={(event) => setSourceType(event.target.value)}>
                  <option>Over-the-counter medicine</option>
                  <option>Prescription medicine</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span>Notes</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional reason, symptom, or doctor instruction"
                rows="3"
              />
            </label>

            <label className="field-checkbox">
              <input
                type="checkbox"
                checked={isMarkedAntibiotic}
                onChange={(event) => setIsMarkedAntibiotic(event.target.checked)}
              />
              <span>Mark as antibiotic if you know this medicine belongs to that group.</span>
            </label>

            {formMessage ? <p className="form-message form-message--error">{formMessage}</p> : null}
            {formSuccess ? <p className="form-message form-message--success">{formSuccess}</p> : null}

            <button className="button button--primary" type="submit">
              Save Medicine
            </button>
          </form>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <p className="section-tag">Antibiotic awareness</p>
              <h2>Repeat-use alerts</h2>
            </div>
          </div>

          {antibioticAlerts.length ? (
            <div className="alert-list">
              {antibioticAlerts.map((alert) => (
                <article
                  className={`alert-card ${alert.severity === "high" ? "alert-card--high" : ""}`}
                  key={alert.name}
                >
                  <span className="record-chip">{alert.severity === "high" ? "High attention" : "Watch"}</span>
                  <h3>{alert.name}</h3>
                  <p>{alert.message}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No repeat antibiotic pattern found</h3>
              <p>As medicine dates are added, this section will highlight when the same antibiotic appears frequently.</p>
            </div>
          )}
        </section>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-tag">Medicine history</p>
            <h2>Searchable medicine log</h2>
          </div>
        </div>

        {filteredMedicines.length ? (
          <div className="record-list">
            {filteredMedicines.map((medicine) => (
              <article className="record-card record-card--stacked" key={medicine.id}>
                <div>
                  <div className="card-chip-row">
                    <span className="record-chip">{medicine.sourceType}</span>
                    <span className="record-chip record-chip--muted">{medicine.recognitionSource}</span>
                    {medicine.isAntibiotic ? <span className="record-chip record-chip--alert">Antibiotic</span> : null}
                  </div>
                  <h3>{medicine.name}</h3>
                  <p>
                    Dose: {medicine.dose}
                    {medicine.note ? ` • ${medicine.note}` : ""}
                  </p>
                  {medicine.linkedRecordName ? (
                    <p className="helper-text">Linked upload: {medicine.linkedRecordName}</p>
                  ) : null}
                </div>

                <div className="record-meta">
                  <span>{formatMedicineDate(medicine.takenOn)}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No medicine matches found</h3>
            <p>Try another search term or add the first medicine entry for this account.</p>
          </div>
        )}
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="section-tag">Uploaded files</p>
            <h2>Medical documents in this account only</h2>
          </div>
        </div>

        {filteredRecords.length ? (
          <div className="record-list">
            {filteredRecords.map((record) => (
              <article className="record-card" key={record.id}>
                <div>
                  <span className="record-chip">{record.category}</span>
                  <h3>{record.name}</h3>
                  <p>{record.note || "No extra notes added for this upload."}</p>
                  {record.linkedMedicineName ? (
                    <p className="helper-text">Recognized medicine: {record.linkedMedicineName}</p>
                  ) : null}
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
            <h3>No uploads found</h3>
            <p>Use the Upload File menu item to add the first document for this account.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Records;
