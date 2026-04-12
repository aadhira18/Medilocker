import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportAnimation from "../components/ReportAnimation.jsx";
import { saveStoredRecord } from "../utils/storage.js";

function formatFileSize(size) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Lab Report");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please choose a file before uploading.");
      return;
    }

    const uploadedAt = new Date();

    saveStoredRecord({
      id: `${uploadedAt.getTime()}`,
      category,
      name: file.name,
      note,
      sizeLabel: formatFileSize(file.size),
      uploadedAtLabel: uploadedAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    navigate("/records");
  };

  return (
    <div className="content-stack">
      <section className="upload-stage">
        <div className="page-section upload-stage__intro">
          <p className="section-tag">Upload workspace</p>
          <h1>Add a new medical file</h1>
          <p className="section-copy">The uploaded file metadata will appear in your records list and be available from the analysis menu.</p>
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
