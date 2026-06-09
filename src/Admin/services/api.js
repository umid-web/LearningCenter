// src/Admin/services/api.js
// Central Axios instance. When the real backend is ready, only the
// baseURL (or VITE_API_URL env variable) needs to change.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Attach auth token automatically (ready for real backend auth).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors so the UI always receives a readable message.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Noma'lum xatolik yuz berdi";
    return Promise.reject(new Error(message));
  }
);

export default api;
