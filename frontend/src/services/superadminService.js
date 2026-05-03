import api from "../api/api";

export const getAllAdmins = async () => {
  const response = await api.get("/superadmin/admins");
  return response.data;
};

export const createAdmin = async (adminData) => {
  const response = await api.post("/superadmin/create-admin", adminData);
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await api.delete(`/superadmin/delete-admin/${id}`);
  return response.data;
};

export const getAllUniversities = async () => {
  const response = await api.get("/superadmin/universities");
  return response.data;
};

export const createUniversity = async (uniData) => {
  const response = await api.post("/superadmin/universities", uniData);
  return response.data;
};

export const deleteUniversity = async (id) => {
  const response = await api.delete(`/superadmin/universities/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/superadmin/users");
  return response.data;
};
