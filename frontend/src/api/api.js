import axios from "axios";

// 🔹 Module-scoped guard to prevent multiple simultaneous logout triggers
let isLoggingOut = false;

// 🔹 Normalize base URL (no trailing slash)
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "https://myunilife-web-page.onrender.com/api/v1"
).replace(/\/$/, "");

console.log("📡 API Base URL:", API_BASE_URL);

// 🔹 Reset guard (used by AuthContext after logout completes)
export const resetLogoutGuard = () => {
  isLoggingOut = false;
};

// 🔹 Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // cleanup if no token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor (centralized error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Clean error message extraction
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    error.message = message;

    // ✅ Trigger global logout ONCE on 401
    if (error?.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      console.warn("⚠️ Unauthorized - token may be expired");

      // Notify React app (AuthContext listens to this)
      window.dispatchEvent(new Event("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default api;