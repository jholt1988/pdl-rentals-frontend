import axios from "axios";
import { getToken } from "./authService";
import { createCacheAdapter } from "axios-simple-cache-adapter";
import axiosRetry from "axios-retry";
import debounce from "lodash.debounce";

const API_URL = "http://localhost:5000/api";

// Axios instance with authentication headers
const cache = createCacheAdapter({
    defaultTTL: 15 * 60 * 1000 // Cache for 15 minutes
});

const axiosInstance = axios.create({
    baseURL: API_URL,
    adapter: cache
});

axiosRetry(axiosInstance, { retries: 3 });

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
    (error) => {
        return Promise.reject(error);
    }
);

// Batching requests
const batchRequests = async (requests) => {
    const response = await axiosInstance.all(requests);
    return response.map(res => res.data);
};

// Debouncing requests
const debouncedGet = debounce(async (url, config) => {
    const response = await axiosInstance.get(url, config);
    return response.data;
}, 300);


export const getDashboardInfo = async () => {
    const request = await batchRequests(fetchProperties, fetchTenants, fetchMaintenanceRequests)
    return request
}

// Property API functions
export const fetchProperties = async () => {
    return debouncedGet("/properties");
};

export const createProperty = async (propertyData) => {
    const response = await axiosInstance.post(`/properties`, propertyData);
    return response.data;
};

export const updateProperty = async (id, propertyData) => {
    const response = await axiosInstance.put(`/properties/${id}`, propertyData);
    return response.data;
};

export const deleteProperty = async (id) => {
    await axiosInstance.delete(`/properties/${id}`);
};

// Tenant API functions
export const fetchTenants = async () => {
    return debouncedGet("/tenants");
};

export const createTenant = async (tenantData) => {
    const response = await axiosInstance.post("/tenants", tenantData);
    return response.data;
};

export const updateTenant = async (id, tenantData) => {
    const response = await axiosInstance.put(`/tenants/${id}`, tenantData);
    return response.data;
};

export const deleteTenant = async (id) => {
    await axiosInstance.delete(`/tenants/${id}`);
};


// Payment API functions
export const fetchPayments = async () => {
    return debouncedGet("/payments");
};

export const createPayment = async (paymentData) => {
    const response = await axiosInstance.post("/payments", paymentData);
    return response.data;
};

export const updatePayment = async (id, paymentData) => {
    const response = await axiosInstance.put(`/payments/${id}`, paymentData);
    return response.data;
};

export const deletePayment = async (id) => {
    await axiosInstance.delete(`/payments/${id}`);
};

// Maintenance Request API functions
export const fetchMaintenanceRequests = async () => {
    return debouncedGet("/maintenance");
};

export const createMaintenanceRequest = async (requestData) => {
    const response = await axiosInstance.post("/maintenance", requestData);
    return response.data;
};

export const updateMaintenanceRequest = async (id, requestData) => {
    const response = await axiosInstance.put(`/maintenance/${id}`, requestData);
    return response.data;
};

export const deleteMaintenanceRequest = async (id) => {
    await axiosInstance.delete(`/maintenance/${id}`);
};

export const getDashboardStats = async () => {
    return debouncedGet("/admin/stats");
};

export const sendPaymentStatement = async (tenantId) => {
    const response = await axiosInstance.post(`/payments/send-statement/${tenantId}`);
    return response.data;
};

export const fetchLeases = async () => {
    return debouncedGet("/leases");
};

export const createLease = async (leaseData) => {
    const response = await axiosInstance.post("/leases", leaseData);
    return response.data;
};

export const updateLease = async (id, leaseData) => {
    const response = await axiosInstance.put(`/leases/${id}`, leaseData);
    return response.data;
};

export const deleteLease = async (id) => {
    await axiosInstance.delete(`/leases/${id}`);
};

export const fetchTenantBalances = async () => {
    return debouncedGet("/payments/balances");
};
