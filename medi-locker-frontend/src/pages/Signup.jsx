import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Signup successful (demo)");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecf0f1",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
  },
  button: {
    padding: "10px",
    background: "#2ecc71",
    color: "white",
    border: "none",
  },
};

export default Signup;