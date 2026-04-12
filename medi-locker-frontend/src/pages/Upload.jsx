import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    alert("File uploaded (demo)");
  };

  return (
    <div style={styles.container}>
      <h2>Upload Medical Record</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#3498db",
    color: "white",
    border: "none",
  },
};

export default Upload;