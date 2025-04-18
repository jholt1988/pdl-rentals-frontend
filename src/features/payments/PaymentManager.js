// src/features/payments/PaymentManager.jsx
import React, { useState } from 'react';
import usePayments from './usePayments';
import PaymentForm from './PaymentForm';

const PaymentManager = () => {
    const {
        payments,
        loading,
        createPayment,
        updatePayment,
        deletePayment
    } = usePayments();

    const [editingPayment, setEditingPayment] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Payments</h2>
                <button
                    onClick={() => {
                        setEditingPayment(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Add Payment
                </button>
            </div>

            {loading ? (
                <p>Loading payments...</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Amount</th>
                            <th className="text-left p-2">Method</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {payments.map((payment) => (
                        
                            <tr key={payment.id} className="border-t">
                                <td className="p-2">${payment.amount}</td>
                                <td className="p-2">{payment.method}</td>
                                <td className="p-2">{payment.status}</td>
                                <td className="p-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingPayment(payment);
                                            setIsFormOpen(true);
                                        }}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded"
                                    >Edit</button>
                                    <button
                                        onClick={() => deletePayment(payment.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isFormOpen && (
                <PaymentForm
                    initialData={editingPayment}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={async (data) => {
                        if (editingPayment) {
                            await updatePayment(editingPayment.id, data);
                        } else {
                            await createPayment(data);
                        }
                        setIsFormOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default PaymentManager;
