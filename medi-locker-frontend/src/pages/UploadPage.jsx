import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportAnimation from "../components/ReportAnimation.jsx";
import useAuth from "../context/useAuth.js";
import {
  extractDose,
  recognizeMedicineNames,
  resolveMedicineDetails,
} from "../utils/medicine.js";
import { saveStoredMedicine, saveStoredRecord } from "../utils/storage.js";

function formatFileSize(size) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [category, setCategory] = useState("Lab Report");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [recognitionSource, setRecognitionSource] = useState("Prescription");
  const [recognitionText, setRecognitionText] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [takenOn, setTakenOn] = useState(getTodayValue());
  const [medicineType, setMedicineType] = useState("Prescription medicine");
  const [isMarkedAntibiotic, setIsMarkedAntibiotic] = useState(false);

  const recognizedMedicines = recognizeMedicineNames(recognitionText);
  const suggestedDose = extractDose(recognitionText);

  const handleUpload = (event) => {
    event.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please choose a file before uploading.");
      return;
    }

    const hasMedicineContext = Boolean(
      medicineName.trim() || dose.trim() || recognitionText.trim(),
    );
    const medicineDetails = hasMedicineContext
      ? resolveMedicineDetails({
          isMarkedAntibiotic,
          medicineName,
          recognitionText,
        })
      : null;

    if (hasMedicineContext && !medicineDetails.medicineName) {
      setMessage("Add a medicine name or paste readable prescription or bill text for recognition.");
      return;
    }

    if (hasMedicineContext && !takenOn) {
      setMessage("Please add the medicine date so the antibiotic alert can track repeat use.");
      return;
    }

    const uploadedAt = new Date();
    const recordId = `record-${uploadedAt.getTime()}`;

    saveStoredRecord(user.email, {
      category,
      id: recordId,
      linkedMedicineName: medicineDetails?.medicineName ?? "",
      name: file.name,
      note,
      sizeLabel: formatFileSize(file.size),
      uploadedAtLabel: uploadedAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    if (hasMedicineContext) {
      saveStoredMedicine(user.email, {
        dose: dose.trim() || medicineDetails.suggestedDose || "Dose not added",
        id: `medicine-${uploadedAt.getTime()}`,
        isAntibiotic: medicineDetails.isAntibiotic,
        linkedRecordId: recordId,
        linkedRecordName: file.name,
        name: medicineDetails.medicineName,
        note: note.trim(),
        recognitionSource,
        recognitionText: recognitionText.trim(),
        sourceType: medicineType,
        takenOn,
      });
    }

    navigate("/records");
  };

  return (
    <div className="content-stack">
      <section className="upload-stage">
        <div className="page-section upload-stage__intro">
          <p className="section-tag">Upload workspace</p>
          <h1>Add a new medical file</h1>
          <p className="section-copy">
            Files stay inside the logged-in account only. You can also capture the medicine name, dose,
            and date from a prescription or pharmacy bill so MediLocker can watch repeated antibiotic use.
          </p>
          <ReportAnimation compact />
        </div>

        <div className="page-section upload-stage__form">
          <form className="upload-form" onSubmit={handleUpload}>
            <label className="field">
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Lab Report</option>
                <option>Prescription</option>
                <option>Scan</option>
                <option>Discharge Summary</option>
                <option>Medical Bill</option>
              </select>
            </label>

            <label className="field">
              <span>Choose file</span>
              <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            </label>

            <label className="field">
              <span>Notes</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional notes about the uploaded document"
                rows="4"
              />
            </label>

            <div className="form-section-heading">
              <h2>Medicine recognition</h2>
              <p>
                Paste the text from a prescription first. If the medicine is not readable there, try the
                pharmacy bill text, or type the medicine manually.
              </p>
            </div>

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
                placeholder="Paste medicine text so the app can recognize names like Amoxicillin or Azithromycin"
                rows="5"
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
                No medicine matched yet. You can still enter the medicine name manually below.
              </p>
            )}

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Medicine name</span>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(event) => setMedicineName(event.target.value)}
                  placeholder="Example: Amoxicillin"
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
                <span>Date taken or purchased</span>
                <input type="date" value={takenOn} onChange={(event) => setTakenOn(event.target.value)} />
              </label>

              <label className="field">
                <span>Medicine type</span>
                <select value={medicineType} onChange={(event) => setMedicineType(event.target.value)}>
                  <option>Prescription medicine</option>
                  <option>Over-the-counter medicine</option>
                </select>
              </label>
            </div>

            <label className="field-checkbox">
              <input
                type="checkbox"
                checked={isMarkedAntibiotic}
                onChange={(event) => setIsMarkedAntibiotic(event.target.checked)}
              />
              <span>Mark this medicine as an antibiotic if you already know it is one.</span>
            </label>

            {message ? <p className="form-message form-message--error">{message}</p> : null}

            <button className="button button--primary" type="submit">
              Upload File
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default UploadPage;
