// src/features/maintenance/MaintenanceManager.jsx
import React, { useState } from 'react';
import useMaintenance from './useMaintenance';
import MaintenanceForm from './MaintenanceForm';

const MaintenanceManager = () => {
    const {
        requests,
        loading,
        createRequest,
        updateRequest,
        deleteRequest
    } = useMaintenance();

    const [editingRequest, setEditingRequest] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Maintenance Requests</h2>
                <button
                    onClick={() => {
                        setEditingRequest(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    New Request
                </button>
            </div>

            {loading ? (
                <p>Loading requests...</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Title</th>
                            <th className="text-left p-2">Property</th>
                            <th className="text-left p-2">Priority</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-t">
                                <td className="p-2">{req.title}</td>
                                <td className="p-2">{req.propertyName}</td>
                                <td className="p-2">{req.priority}</td>
                                <td className="p-2">{req.status}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingRequest(req);
                                            setIsFormOpen(true);
                                        }}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded"
                                    >Edit</button>
                                    <button
                                        onClick={() => deleteRequest(req.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isFormOpen && (
                <MaintenanceForm
                    initialData={editingRequest}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={async (data) => {
                        if (editingRequest) {
                            await updateRequest(editingRequest.id, data);
                        } else {
                            await createRequest(data);
                        }
                        setIsFormOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default MaintenanceManager;


