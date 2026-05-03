import api from "../api/api";

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    // Save token and role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error) {
    throw error; // Re-throw the error with the clean message from interceptor
  }
};

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// GET TOKEN
export const getToken = () => localStorage.getItem("token");

// GET ROLE
export const getRole = () => localStorage.getItem("role");