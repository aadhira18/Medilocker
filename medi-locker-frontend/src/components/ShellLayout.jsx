import { Outlet } from "react-router-dom";
import useAuth from "../context/useAuth.js";
import Footer from "./Footer.jsx";
import ShellHeader from "./ShellHeader.jsx";
import Sidebar from "./Sidebar.jsx";

function ShellLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <div className="utility-bar">
        <div className="shell-band utility-bar__content">
          <span>ISO-ready digital health record management</span>
          <span>care@medilocker.com</span>
          <span>24x7 guided support</span>
        </div>
      </div>
      <ShellHeader />
      <div className={isAuthenticated ? "page-frame page-frame--member" : "page-frame"}>
        {isAuthenticated ? <Sidebar /> : null}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ShellLayout;
