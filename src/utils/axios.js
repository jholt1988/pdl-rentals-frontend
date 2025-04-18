
import axios from "axios";
import axiosRetry from "axios-retry";
import { getToken } from "../services/authService";
import { setupCache } from "axios-cache-interceptor";

const Axios = 
    axios.create({
        baseURL: "http://localhost:5000/api", // Change this to your backend URL
        timeout: 10000, // 10 seconds timeout
        headers: {
            'Content-Type': 'application/json',
        },
    });
const axiosInstance = setupCache(Axios, { maxAge: 15 * 60 * 1000 });

axiosRetry(axiosInstance, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const request = (method, url, data) => {
    if (method === "delete") {
        return axiosInstance.delete(url, { data });
    } else if (method === "post") {
        return axiosInstance.post(url, data);
    } else if (method === "put") {
        return axiosInstance.put(url, data);
    }
    else if (method === "get") {
        return axiosInstance.get(url, { params: data });
    }
    return axiosInstance[method](url, data);
};
const api = {
    request,
    get: (url, data) => request("get", url, data),
  post: (url, data) => request("post", url, data),
  put: (url, data) => request("put", url, data),
  delete: (url, data) => request("delete", url, data),
};


export default api