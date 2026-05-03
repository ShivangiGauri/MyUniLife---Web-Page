import axios from "axios";

// Standardize API_BASE_URL to NOT have a trailing slash
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "https://myunilife-web-page.onrender.com/api/v1").replace(/\/$/, "");

console.log("📡 API Base URL:", API_BASE_URL);

// Create a clean axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for token injection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging for final URL
    // Note: Axios baseURL + relative URL with leading slash can be tricky.
    // We ensure endpoints called with / work correctly with our baseURL.
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    error.message = message;
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    
    return Promise.reject(error);
  }
);

export default api;
