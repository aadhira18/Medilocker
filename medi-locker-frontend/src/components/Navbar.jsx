import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        MediLocker
      </h2>

      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/upload" style={styles.link}>Upload</Link>
            <Link to="/records" style={styles.link}>Records</Link>

            <span style={styles.user}>👤 {user.name}</span>

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} style={styles.btn}>
              Login
            </button>
            <button onClick={() => navigate("/signup")} style={styles.btnOutline}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#2c3e50",
    color: "white",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    cursor: "pointer",
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
  },
  user: {
    marginLeft: "15px",
  },
  logout: {
    marginLeft: "10px",
    padding: "5px 10px",
    background: "red",
    color: "white",
    border: "none",
  },
  btn: {
    marginRight: "10px",
    padding: "8px 15px",
    background: "#3498db",
    color: "white",
    border: "none",
  },
  btnOutline: {
    padding: "8px 15px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
  },
};

export default Navbar;