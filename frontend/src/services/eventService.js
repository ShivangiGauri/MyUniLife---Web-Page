import api, { API_BASE_URL } from "../api/api";

export const getEvents = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/events`,  eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
