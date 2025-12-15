import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../utils/api.js";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("crm:user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("crm:token"));

  useEffect(() => {
    // Always set the Authorization header from token state
    setAuthToken(token);

    // Persist when we have both user and token
    if (user && token) {
      localStorage.setItem("crm:user", JSON.stringify(user));
      localStorage.setItem("crm:token", token);
      return;
    }

    // If token exists but no user (page load or stale state), validate token with server
    const validate = async () => {
      if (!token) return;
      try {
        const { data } = await api.get("/auth/me");
        if (data?.user) {
          setUser(data.user);
        } else {
          // invalid token or no user -> clear
          logout();
        }
      } catch (err) {
        // Token invalid or request failed -> ensure we clear client state
        logout();
      }
    };

    // Only validate when there is a token but no user in state
    if (token && !user) validate();
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

