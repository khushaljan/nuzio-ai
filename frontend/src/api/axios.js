import axios from "axios";

// Central axios instance pre-configured for the backend.
// Base URL comes from VITE_API_URL (set at build/deploy time),
// falling back to the local dev backend when running locally.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;