import axios from "axios";

const API_URL = "https://myunilife-web-page.onrender.com/api/v1/auth";

// LOGIN
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  const data = response.data;

  // Save token
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  return data;
};

// REGISTER
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
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