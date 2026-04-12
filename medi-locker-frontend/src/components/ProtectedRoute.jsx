import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
