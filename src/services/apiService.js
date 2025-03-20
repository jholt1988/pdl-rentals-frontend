import axios from "axios";

// Base API URL (set in .env)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor - Attach Token to Requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handle Token Expiry & Refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                try {
                    const { data } = await axios.post(`${API_URL}/auth/refreshToken`, { token: refreshToken });
                    localStorage.setItem("token", data.accessToken);
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    localStorage.removeItem("token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

// API Calls
export const apiService = {
  login: (credentials) => axiosInstance.post("/users/login", credentials),
  register: (userData) => axiosInstance.post("/users/register", userData),
  fetchLeases: () => axiosInstance.get("/leases"),
  fetchPayments: () => axiosInstance.get("/payments"),
  fetchProperties: () => axiosInstance.get("/properties"),
  createProperty: (propertyData) =>
    axiosInstance.post("/properties", propertyData),
  requestPasswordReset: (email) =>
    axiosInstance.post("/auth/requestPasswordReset", { email }),
  resetPassword: (data) => axiosInstance.post("/auth/resetPassword", data),
};


export default axiosInstance;
