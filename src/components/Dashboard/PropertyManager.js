import React, { useEffect, useState } from "react";
import { fetchProperties, createProperty, updateProperty, deleteProperty } from "../../services/apiService";
import "../../theme.css"

const PropertyManager = () => {
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({ address: "", units: 1 });
    const [editId, setEditId] = useState(null);
   
    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await fetchProperties();
            setProperties(data);
        } catch (error) {
            console.error("Error loading properties:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateProperty(editId, formData);
            } else {
                await createProperty(formData);
            }
            setFormData({ address: "", units: 1 });
            setEditId(null);
            loadProperties();
        } catch (error) {
            console.error("Error saving property:", error);
        }
    };

    const handleEdit = (property) => {
        setEditId(property.id);
        setFormData({ address: property.address, units: property.units });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            await deleteProperty(id);
            loadProperties();
        }
    };

    return (
        <div className="container">
        <div className="card">
            <h2 className="text-center">Manage Properties</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                <input type="number" name="units" value={formData.units} onChange={handleChange} placeholder="Number of Units" required />
                <button type="submit">{editId ? "Update" : "Add"} Property</button>
            </form>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Address</th>
                        <th>Units</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.id}</td>
                            <td>{property.address}</td>
                            <td>{property.units}</td>
                            <td>
                                <button onClick={() => handleEdit(property)}>Edit</button>
                                <button onClick={() => handleDelete(property.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PropertyManager;
