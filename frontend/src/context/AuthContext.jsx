import { createContext, useContext, useState, useEffect } from "react";
import api, { resetLogoutGuard } from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🔹 Initial auth check (runs once)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (!storedUser || !storedToken) {
          setLoading(false);
          return;
        }

        // ✅ Instant restore (prevents flicker)
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        // ✅ Silent backend verification
        const res = await api.get("/auth/me");

        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

      } catch (err) {
        console.warn("Auth check failed (non-critical):", err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔹 Listen for global logout event (from axios interceptor)
  useEffect(() => {
    const handleLogout = () => {
      // ✅ Prevent duplicate logout
      if (!token && !user) return;

      console.log("🔄 Auto-logging out due to auth failure...");
      logout();

      // ✅ Reset guard for future sessions
      setTimeout(() => {
        resetLogoutGuard();
      }, 0);
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [token, user]);

  // 🔹 Login
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 Logout
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};