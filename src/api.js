// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://profit-bliss-backend-57u2.onrender.com", // ✅ your Render backend URL
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("pb_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
