import React, { useEffect, useState } from "react";
import { fetchTenants, createTenant, updateTenant, deleteTenant, sendPaymentStatement } from "../../services/apiService";
import "../../theme.css"
const TenantManager = () => {
    const [tenants, setTenants] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadTenants();
    }, []);

    const loadTenants = async () => {
        try {
            const data = await fetchTenants();
            setTenants(data);
        } catch (error) {
            console.error("Error loading tenants:", error);
        }
    };
   
    const handleSendStatement = async (tenantId) => {
        if (window.confirm("Send payment statement to this tenant?")) {
            try {
                await sendPaymentStatement(tenantId);
                alert("Payment statement sent successfully!");
            } catch (error) {
                console.error("Error sending statement:", error);
            }
        }
    };




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateTenant(editId, formData);
            } else {
                await createTenant(formData);
            }
            setFormData({ name: "", email: "", phone: "" });
            setEditId(null);
            loadTenants();
        } catch (error) {
            console.error("Error saving tenant:", error);
        }
    };

    const handleEdit = (tenant) => {
        setEditId(tenant.id);
        setFormData({ name: tenant.name, email: tenant.email, phone: tenant.phone });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tenant?")) {
            await deleteTenant(id);
            loadTenants();
        }
    };

    return (
        <div className="container">
            
        <div className="card">
            <h2 className="text-center">Manage Tenants</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                <button type="submit">{editId ? "Update" : "Add"} Tenant</button>
            </form>

           
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map((tenant) => (
                        <tr key={tenant.id}>
                            <td>{tenant.id}</td>
                            <td>{tenant.name}</td>
                            <td>{tenant.email}</td>
                            <td>{tenant.phone}</td>
                            <td>
                                <button onClick={() => handleSendStatement(tenant.id)}>Send Statement</button>
                                <button onClick={() => handleEdit(tenant)}>Edit</button>
                                <button onClick={() => handleDelete(tenant.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default TenantManager;
