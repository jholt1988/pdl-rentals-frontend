import React, { useState, useEffect } from 'react';
import { getProperties, createProperty, updateProperty, deleteProperty } from './property.api';
import PropertyForm from './PropertyForm';
import { toast } from 'react-toastify';

const PropertyManager = () => {
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const loadProperties = async () => {
        try {
            const { data } = await getProperties();
            setProperties(data);
        } catch (err) {
            toast.error('Failed to load properties');
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    const handleCreate = async (formData) => {
        try {
            await createProperty(formData);
            toast.success('Property created');
            loadProperties();
        } catch (err) {
            toast.error('Error creating property');
        }
    };

    const handleUpdate = async (id, formData) => {
        try {
            await updateProperty(id, formData);
            toast.success('Property updated');
            loadProperties();
        } catch (err) {
            toast.error('Error updating property');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProperty(id);
            toast.success('Property deleted');
            loadProperties();
        } catch (err) {
            toast.error('Failed to delete property');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Properties</h2>
                <button
                    onClick={() => {
                        setEditingProperty(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Add Property
                </button>
            </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Address</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Units</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id} className="border-t">
                            <td className="p-2">{property.name}</td>
                            <td className="p-2">{property.address}</td>
                            <td className="p-2">{property.type}</td>
                            <td className="p-2">{property.unitCount}</td>
                            <td className="p-2 space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingProperty(property);
                                        setIsFormOpen(true);
                                    }}
                                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                                >Edit</button>
                                <button
                                    onClick={() => handleDelete(property.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isFormOpen && (
                <PropertyForm
                    initialData={editingProperty}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={(data) => {
                        if (editingProperty) {
                            handleUpdate(editingProperty.id, data);
                        } else {
                            handleCreate(data);
                        }
                        setIsFormOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default PropertyManager;
