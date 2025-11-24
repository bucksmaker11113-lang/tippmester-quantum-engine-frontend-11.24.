import axios from "axios";

// API base URL from environment
const API_URL = globalThis.__APP_CONFIG__?.API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

// Generic methods
export const get = (url, params = {}) => api.get(url, { params });
export const post = (url, data = {}) => api.post(url, data);
export const put = (url, data = {}) => api.put(url, data);
export const del = (url) => api.delete(url);

// Specific API endpoints
export const fetchTips = () => get("/tips");
export const fetchLiveTips = () => get("/live");
export const fetchKombi = () => get("/kombi");
export const sendChatMessage = (message) => post("/chat", { message });

export default api;