import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" }
});

// add auth header automatically if token present
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("pb_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
