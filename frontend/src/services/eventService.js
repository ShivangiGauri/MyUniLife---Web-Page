import api from "../api/api";

export const getEvents = async () => {
  try {
    const response = await api.get("events");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("events", eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
