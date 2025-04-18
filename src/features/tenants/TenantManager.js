// src/features/tenants/TenantManager.jsx
import React, { useState } from 'react';
import useTenants from './useTenants';
import TenantForm from './TenantForm';

const TenantManager = () => {
    const {
        tenants,
        loading,
        createTenant,
        updateTenant,
        deleteTenant
    } = useTenants();

    const [editingTenant, setEditingTenant] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Tenants</h2>
                <button
                    onClick={() => {
                        setEditingTenant(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Add Tenant
                </button>
            </div>

            {loading ? (
                <p>Loading tenants...</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Phone</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} className="border-t">
                                        <td className="p-2">{tenant.name}</td>
                                        <td className="p-2">{tenant.email}</td>
                                        <td className="p-2">{tenant.phone}</td>
                                        <td className="p-2 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingTenant(tenant);
                                                    setIsFormOpen(true);
                                                }}
                                                className="px-3 py-1 bg-yellow-400 text-white rounded"
                                            >Edit</button>
                                            <button
                                                onClick={() => deleteTenant(tenant.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded"
                                            >Delete</button>
                                        </td>
                                    </tr>
                        ))}
                    </tbody>
                </table>
            )}
        
            {isFormOpen && (
                                        <TenantForm
                                            initialData={editingTenant}
                                            onClose={() => setIsFormOpen(false)}
                                            onSubmit={async (data) => {
                                                if (editingTenant) {
                                                    await updateTenant(editingTenant.id, data);
                                                } else {
                                                    await createTenant(data);
                                                }
                                                setIsFormOpen(false);
                                            }}
                                        />
            )}
        </div>
    );
};

export default TenantManager;



