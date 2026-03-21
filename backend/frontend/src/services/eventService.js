import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/events";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getEvents = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData, authHeader());
  return response.data;
};