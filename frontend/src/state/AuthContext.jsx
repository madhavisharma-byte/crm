import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../utils/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("crm:user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("crm:token"));

  useEffect(() => {
    setAuthToken(token);
    if (user && token) {
      localStorage.setItem("crm:user", JSON.stringify(user));
      localStorage.setItem("crm:token", token);
    }
  }, [user, token]);

  const login = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("crm:user");
    localStorage.removeItem("crm:token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

