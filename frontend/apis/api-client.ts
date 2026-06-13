import axios from "axios";
import authStore from "@/store/authStore";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(token);

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    const isAuthEndpoint = url.includes("/login") || url.includes("/signup");

    if (status === 401 && !isAuthEndpoint) {
      toast.error("Your session has expired. Please log in again.");
      authStore.getState().logout(); // clear the dead session

      window.location.replace("/auth");
    }
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  },
);
export default apiClient;
