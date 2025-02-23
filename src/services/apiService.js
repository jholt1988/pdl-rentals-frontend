import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// Axios instance with authentication headers
const axiosInstance = axios.create({
    baseURL: API_URL,
});

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

// Property API functions
export const fetchProperties = async () => {
    const response = await axiosInstance.get("/properties");
    return response.data;
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
    const response = await axiosInstance.get("/tenants");
    return response.data;
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
    const response = await axiosInstance.get("/payments");
    return response.data;
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
    const response = await axiosInstance.get("/maintenance");
    return response.data;
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
    const response = await axiosInstance.get("/admin/stats");
    return response.data;
};

export const sendPaymentStatement = async (tenantId) => {
    const response = await axiosInstance.post(`/payments/send-statement/${tenantId}`);
    return response.data;
};

export const fetchLeases = async () => {
    const response = await axiosInstance.get("/leases");
    return response.data;
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
    const response = await axiosInstance.get("/payments/balances");
    return response.data;
};


