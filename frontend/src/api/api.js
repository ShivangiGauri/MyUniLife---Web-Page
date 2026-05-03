import axios from "axios";

export const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

if (import.meta.env.DEV) {
  console.log("🚀 API Base URL:", API_BASE_URL);
}

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract a meaningful error message
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    
    // Handle specific status codes
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // Optional: window.location.href = "/login";
    }

    // Attach the clean message to the error object so services can catch it
    error.message = message;
    return Promise.reject(error);
  }
);

export default api;
