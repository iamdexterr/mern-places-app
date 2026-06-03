import axios from "axios";
import authStore from "@/store/authStore";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  // const token = authStore.getToken();

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  },
);
export default apiClient;
