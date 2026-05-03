import api, { API_BASE_URL } from "../api/api";

export const getAllAdmins = async () => {
  const response = await api.get(`${API_BASE_URL}/superadmin/admins`);
  return response.data;
};

export const createAdmin = async (adminData) => {
  const response = await api.post(`${API_BASE_URL}/superadmin/create-admin`,  adminData);
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await api.delete(`${API_BASE_URL}/superadmin/delete-admin/${id}`);
  return response.data;
};

export const getAllUniversities = async () => {
  const response = await api.get(`${API_BASE_URL}/superadmin/universities`);
  return response.data;
};

export const createUniversity = async (uniData) => {
  const response = await api.post(`${API_BASE_URL}/superadmin/universities`,  uniData);
  return response.data;
};

export const deleteUniversity = async (id) => {
  const response = await api.delete(`${API_BASE_URL}/superadmin/universities/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`${API_BASE_URL}/superadmin/users`);
  return response.data;
};
