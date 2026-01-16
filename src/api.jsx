import axios from "axios";

/**
 * Axios instance
 * Backend base URL
 */
const API = axios.create({
  baseURL: "https://event-registration-backend-7d42.onrender.com/api",
});

/* =========================
   EVENT APIs
========================= */

// Get all events
export const getEvents = () => API.get("/events");

// Create a new event (admin)
export const createEvent = (eventData) =>
  API.post("/events", eventData);

/* =========================
   REGISTRATION APIs
========================= */

// Register user for event
export const registerUser = (data) =>
  API.post("/registrations", data);

// Get registrations (admin)
export const getRegistrations = (params) =>
  API.get("/registrations", { params });

// Delete registration
export const deleteRegistration = (id) =>
  API.delete(`/registrations/${id}`);

// Export Excel
export const exportExcel = () =>
  API.get("/registrations/export/excel", {
    responseType: "blob",
  });

export default API;
