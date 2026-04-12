import { useEffect, useState } from "react";
import AuthContext from "./auth-context.js";
import {
  clearStoredSession,
  getStoredSession,
  setStoredSession,
} from "../utils/storage.js";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredSession());

  useEffect(() => {
    if (user) {
      setStoredSession(user);
      return;
    }

    clearStoredSession();
  }, [user]);

  const login = (nextUser) => {
    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(user),
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
