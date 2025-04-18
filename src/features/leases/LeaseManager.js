// src/features/leases/LeaseManager.jsx
import React, { useState } from 'react';
import useLeases from './useLeases';
import LeaseForm from './LeaseForm';

const LeaseManager = () => {
  const {
    leases,
    loading,
    createLease,
    updateLease,
    deleteLease
  } = useLeases();

  const [editingLease, setEditingLease] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leases</h2>
        <button
          onClick={() => {
            setEditingLease(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Lease
        </button>
      </div>

      {loading ? (
        <p>Loading leases...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Tenant</th>
              <th className="text-left p-2">Property</th>
              <th className="text-left p-2">Start</th>
              <th className="text-left p-2">End</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => (
              <tr key={lease.id} className="border-t">
                <td className="p-2">{lease.tenantName}</td>
                <td className="p-2">{lease.propertyName}</td>
                <td className="p-2">{lease.startDate}</td>
                <td className="p-2">{lease.endDate}</td>
                <td className="p-2">{lease.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingLease(lease);
                      setIsFormOpen(true);
                    }}
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                  >Edit</button>
                  <button
                    onClick={() => deleteLease(lease.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isFormOpen && (
        <LeaseForm
          initialData={editingLease}
          onClose={() => setIsFormOpen(false)}
          onSubmit={async (data) => {
            if (editingLease) {
              await updateLease(editingLease.id, data);
            } else {
              await createLease(data);
            }
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default LeaseManager;

