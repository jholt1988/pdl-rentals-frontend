// src/features/properties/PropertyForm.jsx
import React, { useState, useEffect } from 'react';
import ModalWrapper from '../../components/ModalWrapper';
const PropertyForm = ({ initialData = {}, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        address: '',
        type: '',
        unitCount: 1,
        ...initialData
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (

        
        <ModalWrapper onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData?.id ? 'Edit Property' : 'Add Property'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="Type (e.g. Apartment)"
                        value={form.type}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        name="unitCount"
                        placeholder="Number of Units"
                        value={form.unitCount}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            {initialData?.id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </ModalWrapper>
    );
};

export default PropertyForm;

