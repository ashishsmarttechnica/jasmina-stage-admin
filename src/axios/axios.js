// import axios from 'axios';

// export const axiosClient = axios.create({
//   baseURL: 'http://192.168.29.136:1911/api/v1', // Arpit Base
// });

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVERURL}/api/v1`,
});

// Automatically attach token to every request
axiosClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) config.headers = {};
      // Prefer Bearer token format for most APIs
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      // Also set legacy `token` header for endpoints expecting it
      if (!config.headers["token"]) {
        config.headers["token"] = token;
      }
    }
  } catch (_) {
    // ignore any storage access errors
  }
  return config;
});

