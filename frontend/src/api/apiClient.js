import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const cleanToken = token.replace(/^Bearer\s+/i, "");
    config.headers.Authorization = `Bearer ${cleanToken}`;
  }

  return config;
});

export function getErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.detail || error?.message || fallback;
}

export default apiClient;
