import axios from "axios";
import { getToken } from "./authService";
import { setupCache } from "axios-cache-interceptor";
import axiosRetry from "axios-retry";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Axios = axios.create({ baseURL: API_URL, timeout: 5000 });
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
    } else if (method === "get") {
        return axiosInstance.get(url, { params: data });
    }
    return axiosInstance[method](url, data);
};

// Property API
export const fetchProperties = async () => {
    const response = await request("get", "/properties");
    return response.data;
};

export const createProperty = async (propertyData) => {
    const response = await request("post", "/properties", propertyData);
    return response.data;
};

export const updateProperty = async (id, propertyData) => {
    const response = await request("put", `/properties/${id}`, propertyData);
    return response.data;
};

export const deleteProperty = async (id) => {
    await request("delete", `/properties/${id}`);
};

// Tenant API
export const fetchTenants = async () => {
    const response = await request("get", "/tenants");
    return response.data;
};

export const createTenant = async (tenantData) => {
    const response = await request("post", "/tenants", tenantData);
    return response.data;
};

export const updateTenant = async (id, tenantData) => {
    const response = await request("put", `/tenants/${id}`, tenantData);
    return response.data;
};

export const deleteTenant = async (id) => {
    await request("delete", `/tenants/${id}`);
};

// Payment API
export const fetchPayments = async () => {
    const response = await request("get", "/payments");
    return response.data;
};

export const createPayment = async (paymentData) => {
    const response = await request("post", "/payments", paymentData);
    return response.data;
};

export const updatePayment = async (id, paymentData) => {
    const response = await request("put", `/payments/${id}`, paymentData);
    return response.data;
};

export const deletePayment = async (id) => {
    await request("delete", `/payments/${id}`);
};

// Maintenance Request API
export const fetchMaintenanceRequests = async () => {
    const response = await request("get", "/maintenance");
    return response.data;
};

export const createMaintenanceRequest = async (requestData) => {
    const response = await request("post", "/maintenance", requestData);
    return response.data;
};

export const updateMaintenanceRequest = async (id, requestData) => {
    const response = await request("put", `/maintenance/${id}`, requestData);
    return response.data;
};

export const deleteMaintenanceRequest = async (id) => {
    await request("delete", `/maintenance/${id}`);
};

// Dashboard
export const getDashboardStats = async () => {
    const response = await request("get", "/admin/stats");
    return response.data;
};

export const sendPaymentStatement = async (tenantId) => {
    const response = await request("post", `/ledger/send-statement/${tenantId}`);
    return response.data;
};

// Lease
export const fetchLeases = async () => {
    const response = await request("get", "/leases");
    return response.data;
};

export const createLease = async (leaseData) => {
    const response = await request("post", "/leases", leaseData);
    return response.data;
};

export const updateLease = async (id, leaseData) => {
    const response = await request("put", `/leases/${id}`, leaseData);
    return response.data;
};

export const deleteLease = async (id) => {
    await request("delete", `/leases/${id}`);
};

// Tenant balances
export const fetchTenantBalances = async () => {
    const response = await request("get", "/payments/balances");
    return response.data;
};

// Ledger
export const fetchLedgerForTenant = async (tenantId) => {
    const response = await request("get", `/ledger/${tenantId}`);
    return response.data;
};

export const addLedgerCharge = async (chargeData) => {
    const response = await request("post", "/ledger/charge", chargeData);
    return response.data;
};

export const addLedgerPayment = async (paymentData) => {
    const response = await request("post", "/ledger/payment", paymentData);
    return response.data;
};

export const fetchTenantBalance = async (tenantId) => {
    const response = await request("get", `/ledger/${tenantId}/balance`);
    return response.data;
};

export const generatePaymentStatement = async (tenantId) => {
    const response = await request("get", `/ledger/preview-statement/${tenantId}`);
    return response.data;
};

export const sendTenantStatementApi = async (payload) => {
    try {
        const response = await axiosInstance.post('/ledger/send-statement', payload);
        return response.data;
    } catch (error) {
        console.error('API error in sendTenantStatement:', error);
        throw error;
    }
};

export const fetchTenantStatements = async (tenantId) => {
    const response = await request("get", `/ledger/statements/${tenantId}`);
    return response.data;
}

export const fetchStatement = async (statementId) => {
    const response = await request("get", `/ledger/statement/${statementId}`);
    return response.data;
}

export const fetchAllStatements = async () => {
    const response = await request("get", `/ledger/statements`);
    return response.data;
}

export const fetchStatementPdf = async (statementId) => {
    const response = await request("get", `/ledger/statement-pdf/${statementId}`);
    return response.data;
}

export const fetchNotifications = async () => {
    const response = await request("get", `/notifications`);
    return response.data;
}   

export const markNotificationAsRead = async (notificationId) => {
    const response = await request("put", `/notifications/${notificationId}`);
    return response.data;
}

export const fetchReports = async () => {    
    const response = await request("get", `/reports`);
    return response.data;
}
