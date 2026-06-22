import axios from "axios";

// Helper to clean up baseURL and avoid double slashes
const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/";
  return url.endsWith("/") ? url : `${url}/`;
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach authorization tokens
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userType = localStorage.getItem("userType");
      let token = null;

      if (userType === "club") {
        token = localStorage.getItem("clubToken");
      } else if (userType === "user") {
        token = localStorage.getItem("token");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for uniform error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || "An unexpected error occurred",
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
    console.error("API client error:", customError);
    return Promise.reject(customError);
  }
);

export default apiClient;
