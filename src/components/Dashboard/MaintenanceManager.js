import React, { useEffect, useState } from "react";
import { fetchMaintenanceRequests, createMaintenanceRequest, updateMaintenanceRequest, deleteMaintenanceRequest } from "../../services/apiService";
import "../../theme.css"
const MaintenanceManager = () => {
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({ propertyId: "", tenantId: "", contractorId: "", status: "", description: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const data = await fetchMaintenanceRequests();
            setRequests(data);
        } catch (error) {
            console.error("Error loading maintenance requests:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateMaintenanceRequest(editId, formData);
            } else {
                await createMaintenanceRequest(formData);
            }
            setFormData({ propertyId: "", tenantId: "", contractorId: "", status: "", description: "" });
            setEditId(null);
            loadRequests();
        } catch (error) {
            console.error("Error saving request:", error);
        }
    };

    const handleEdit = (request) => {
        setEditId(request.id);
        setFormData({
            propertyId: request.propertyId,
            tenantId: request.tenantId,
            contractorId: request.contractorId,
            status: request.status,
            description: request.description,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            await deleteMaintenanceRequest(id);
            loadRequests();
        }
    };

    return (
        <div className="container">
        <div className="card">
            <h2 className="text-center">Manage Maintenance Requests</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="propertyId" value={formData.propertyId} onChange={handleChange} placeholder="Property ID" required />
                <input type="text" name="tenantId" value={formData.tenantId} onChange={handleChange} placeholder="Tenant ID" required />
                <input type="text" name="contractorId" value={formData.contractorId} onChange={handleChange} placeholder="Contractor ID" required />
                <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <button type="submit">{editId ? "Update" : "Add"} Request</button>
            </form>
            </div>
        </div>
    );
};

export default MaintenanceManager;
