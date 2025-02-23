
const axios = require("axios");
const apiService = require("./apiService");
const { getToken } = require("./authService");
const MockAdapter = ("axios-mock-adapter");

jest.mock("./authService");

describe("apiService", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        getToken.mockReturnValue("test-token");
    });

    afterEach(() => {
        mock.reset();
    });

    it("should fetch properties", async () => {
        const properties = [{ id: 1, name: "Property 1" }];
        mock.onGet("http://localhost:5000/api/properties").reply(200, properties);

        const result = await apiService.fetchProperties();
        expect(result).toEqual(properties);
    });

    it("should create a property", async () => {
        const propertyData = { name: "New Property" };
        const createdProperty = { id: 1, ...propertyData };
        mock.onPost("http://localhost:5000/api/properties").reply(200, createdProperty);

        const result = await apiService.createProperty(propertyData);
        expect(result).toEqual(createdProperty);
    });

    it("should update a property", async () => {
        const propertyData = { name: "Updated Property" };
        const updatedProperty = { id: 1, ...propertyData };
        mock.onPut("http://localhost:5000/api/properties/1").reply(200, updatedProperty);

        const result = await apiService.updateProperty(1, propertyData);
        expect(result).toEqual(updatedProperty);
    });

    it("should delete a property", async () => {
        mock.onDelete("http://localhost:5000/api/properties/1").reply(200);

        await apiService.deleteProperty(1);
        expect(mock.history.delete.length).toBe(1);
    });

    it("should fetch tenants", async () => {
        const tenants = [{ id: 1, name: "Tenant 1" }];
        mock.onGet("http://localhost:5000/api/tenants").reply(200, tenants);

        const result = await apiService.fetchTenants();
        expect(result).toEqual(tenants);
    });

    it("should create a tenant", async () => {
        const tenantData = { name: "New Tenant" };
        const createdTenant = { id: 1, ...tenantData };
        mock.onPost("http://localhost:5000/api/tenants").reply(200, createdTenant);

        const result = await apiService.createTenant(tenantData);
        expect(result).toEqual(createdTenant);
    });

    it("should update a tenant", async () => {
        const tenantData = { name: "Updated Tenant" };
        const updatedTenant = { id: 1, ...tenantData };
        mock.onPut("http://localhost:5000/api/tenants/1").reply(200, updatedTenant);

        const result = await apiService.updateTenant(1, tenantData);
        expect(result).toEqual(updatedTenant);
    });

    it("should delete a tenant", async () => {
        mock.onDelete("http://localhost:5000/api/tenants/1").reply(200);

        await apiService.deleteTenant(1);
        expect(mock.history.delete.length).toBe(1);
    });

    it("should fetch payments", async () => {
        const payments = [{ id: 1, amount: 100 }];
        mock.onGet("http://localhost:5000/api/payments").reply(200, payments);

        const result = await apiService.fetchPayments();
        expect(result).toEqual(payments);
    });

    it("should create a payment", async () => {
        const paymentData = { amount: 100 };
        const createdPayment = { id: 1, ...paymentData };
        mock.onPost("http://localhost:5000/api/payments").reply(200, createdPayment);

        const result = await apiService.createPayment(paymentData);
        expect(result).toEqual(createdPayment);
    });

    it("should update a payment", async () => {
        const paymentData = { amount: 200 };
        const updatedPayment = { id: 1, ...paymentData };
        mock.onPut("http://localhost:5000/api/payments/1").reply(200, updatedPayment);

        const result = await apiService.updatePayment(1, paymentData);
        expect(result).toEqual(updatedPayment);
    });

    it("should delete a payment", async () => {
        mock.onDelete("http://localhost:5000/api/payments/1").reply(200);

        await apiService.deletePayment(1);
        expect(mock.history.delete.length).toBe(1);
    });

    it("should fetch maintenance requests", async () => {
        const requests = [{ id: 1, description: "Fix leak" }];
        mock.onGet("http://localhost:5000/api/maintenance").reply(200, requests);

        const result = await apiService.fetchMaintenanceRequests();
        expect(result).toEqual(requests);
    });

    it("should create a maintenance request", async () => {
        const requestData = { description: "Fix leak" };
        const createdRequest = { id: 1, ...requestData };
        mock.onPost("http://localhost:5000/api/maintenance").reply(200, createdRequest);

        const result = await apiService.createMaintenanceRequest(requestData);
        expect(result).toEqual(createdRequest);
    });

    it("should update a maintenance request", async () => {
        const requestData = { description: "Fix leak" };
        const updatedRequest = { id: 1, ...requestData };
        mock.onPut("http://localhost:5000/api/maintenance/1").reply(200, updatedRequest);

        const result = await apiService.updateMaintenanceRequest(1, requestData);
        expect(result).toEqual(updatedRequest);
    });

    it("should delete a maintenance request", async () => {
        mock.onDelete("http://localhost:5000/api/maintenance/1").reply(200);

        await apiService.deleteMaintenanceRequest(1);
        expect(mock.history.delete.length).toBe(1);
    });

    it("should get dashboard stats", async () => {
        const stats = { totalProperties: 10, totalTenants: 20 };
        mock.onGet("http://localhost:5000/api/admin/stats").reply(200, stats);

        const result = await apiService.getDashboardStats();
        expect(result).toEqual(stats);
    });

    it("should send payment statement", async () => {
        const tenantId = 1;
        const responseMessage = { message: "Statement sent" };
        mock.onPost(`http://localhost:5000/api/payments/send-statement/${tenantId}`).reply(200, responseMessage);

        const result = await apiService.sendPaymentStatement(tenantId);
        expect(result).toEqual(responseMessage);
    });
});