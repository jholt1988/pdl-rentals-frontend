import axios from "axios";
import { getToken } from "./authService";
import { setupCache } from "axios-cache-adapter";
import axiosRetry from "axios-retry";
import debounce from "lodash/debounce";

const API_URL = "http://localhost:5000/api";

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000, // Cache for 15 minutes
});

// Axios instance with authentication headers and caching
const axiosInstance = axios.create({
    baseURL: API_URL,
    adapter: cache.adapter,
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

// Debounced function for user-triggered actions
const debouncedRequest = debounce((method, url, data) => {
    return axiosInstance[method](url, data);
}, 300);

// Property API functions
export const fetchProperties = async () => {
    const response = await debouncedRequest("get", "/properties");
    return response.data;
};

export const createProperty = async (propertyData) => {
    const response = await debouncedRequest("post", `/properties`, propertyData);
    return response.data;
};

export const updateProperty = async (id, propertyData) => {
    const response = await debouncedRequest("put", `/properties/${id}`, propertyData);
    return response.data;
};

export const deleteProperty = async (id) => {
    await debouncedRequest("delete", `/properties/${id}`);
};

// Tenant API functions
export const fetchTenants = async () => {
    const response = await debouncedRequest("get", "/tenants");
    return response.data;
};

export const createTenant = async (tenantData) => {
    const response = await debouncedRequest("post", "/tenants", tenantData);
    return response.data;
};

export const updateTenant = async (id, tenantData) => {
    const response = await debouncedRequest("put", `/tenants/${id}`, tenantData);
    return response.data;
};

export const deleteTenant = async (id) => {
    await debouncedRequest("delete", `/tenants/${id}`);
};

// Payment API functions
export const fetchPayments = async () => {
    const response = await debouncedRequest("get", "/payments");
    return response.data;
};

export const createPayment = async (paymentData) => {
    const response = await debouncedRequest("post", "/payments", paymentData);
    return response.data;
};

export const updatePayment = async (id, paymentData) => {
    const response = await debouncedRequest("put", `/payments/${id}`, paymentData);
    return response.data;
};

export const deletePayment = async (id) => {
    await debouncedRequest("delete", `/payments/${id}`);
};

// Maintenance Request API functions
export const fetchMaintenanceRequests = async () => {
    const response = await debouncedRequest("get", "/maintenance");
    return response.data;
};

export const createMaintenanceRequest = async (requestData) => {
    const response = await debouncedRequest("post", "/maintenance", requestData);
    return response.data;
};

export const updateMaintenanceRequest = async (id, requestData) => {
    const response = await debouncedRequest("put", `/maintenance/${id}`, requestData);
    return response.data;
};

export const deleteMaintenanceRequest = async (id) => {
    await debouncedRequest("delete", `/maintenance/${id}`);
};

export const getDashboardStats = async () => {
    const response = await debouncedRequest("get", "/admin/stats");
    return response.data;
};

export const sendPaymentStatement = async (tenantId) => {
    const response = await debouncedRequest("post", `/payments/send-statement/${tenantId}`);
    return response.data;
};

export const fetchLeases = async () => {
    const response = await debouncedRequest("get", "/leases");
    return response.data;
};

export const createLease = async (leaseData) => {
    const response = await debouncedRequest("post", "/leases", leaseData);
    return response.data;
};

export const updateLease = async (id, leaseData) => {
    const response = await debouncedRequest("put", `/leases/${id}`, leaseData);
    return response.data;
};

export const deleteLease = async (id) => {
    await debouncedRequest("delete", `/leases/${id}`);
};

export const fetchTenantBalances = async () => {
    const response = await debouncedRequest("get", "/payments/balances");
    return response.data;
};
