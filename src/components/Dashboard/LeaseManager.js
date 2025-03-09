import React, { useEffect, useState } from "react";
import { fetchLeases, createLease, updateLease, deleteLease } from "../../services/apiService";
import "../../theme.css"
const LeaseManager = () => {
    const [leases, setLeases] = useState([]);
    const [formData, setFormData] = useState({
        tenantId: "",
        propertyId: "", 
        unitNumber: "",
        rentAmount: "",
        deposit: "",
        petDeposit: "",
        utilities:" ",
        startDate: "",
        documentUrl:"",
        endDate: "",
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadLeases();
    }, []);

    const loadLeases = async () => {
        try {
            const data = await fetchLeases();
            setLeases(data);
        } catch (error) {
            console.error("Error loading leases:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateLease(editId, formData);
            } else {
                await createLease(formData);
            }
            setFormData({ tenantId: "", propertyId: "", unitNumber: "", rentAmount: "", deposit: "",documentUrl:"", petDeposit: "", utilities:" ", startDate: "", endDate: "" });
            setEditId(null);
            loadLeases();
        } catch (error) {
            console.error("Error saving lease:", error);
        }
    };

    const handleEdit = (lease) => {
        setEditId(lease.id);
        setFormData({
            tenantId: lease.tenantId,
            propertyId: lease.propertyId,
            unitNumber: lease.unitNumber,
            rentAmount: lease.rentAmount,
            deposit: lease.deposit,
            petDeposit: lease.petDeposit,
            utilities: lease.utilities,
            startDate: lease.startDate,
            endDate: lease.endDate,
            documentUrl: lease.document
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lease?")) {
            await deleteLease(id);
            loadLeases();
        }
    };

    return (
        <div className="container">
        <div className="card">
            <h2 className="text-center">Manage Leases</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="tenantId" value={formData.tenantId} onChange={handleChange} placeholder="Tenant ID" required />
                <input type="text" name="propertyId" value={formData.propertyId} onChange={handleChange} placeholder="Property ID" required />
                <input type="text" name="unitNumber" value={formData.unitNumber} onChange={handleChange} placeholder="Unit Number" />
                <input type="number" name="deposit" value={Number(formData.deposit)} onChange={handleChange} placeholder="Deposit" />
                <input type="number" name="petDeposit" value={Number(formData.petDeposit)} onChange={handleChange} placeholder="Pet Deposit" />
                <input type="text" name="utilities" value={formData.utilities} onChange={handleChange} placeholder="Utilities" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Start Date" required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="End Date" required />
                <input type="number" name="rentAmount" value={Number(formData.rentAmount)} onChange={handleChange} placeholder="Rent Per Month" required />
                <button type="submit">{editId ? "Update" : "Add"} Lease</button>
            </form>
            </div>
        </div>
    );
};

export default LeaseManager;
