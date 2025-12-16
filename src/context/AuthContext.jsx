import { createContext, useEffect, useMemo, useState } from "react";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "user_data";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Restaurar sesión desde localStorage en el montaje
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ email, password }) => {
    if (!email || !password) return false;
    const userData = { email };
    localStorage.setItem(AUTH_TOKEN_KEY, "fake-token");
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
