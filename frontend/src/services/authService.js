import api from "../api/api";

// LOGIN
export const loginUser = async (email, password) => {
  try {
    console.log("🔐 Attempting Login at: auth/login");
    const response = await api.post("auth/login", {
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error) {
    throw error;
  }
};

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await api.post("auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};