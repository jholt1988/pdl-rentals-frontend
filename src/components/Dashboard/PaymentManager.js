import React, { useEffect, useState } from "react";
import { fetchPayments, createPayment, updatePayment, deletePayment, fetchTenantBalances } from "../../services/apiService";

const PaymentManager = () => {
    const [payments, setPayments] = useState([]);
    const [balances, setBalances] = useState([]);
    const [formData, setFormData] = useState({ leaseId: "", amount: "", date: "", method: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [paymentsData, balancesData] = await Promise.all([fetchPayments(), fetchTenantBalances()]);
            setPayments(paymentsData);
            setBalances(balancesData);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const leaseBalance = balances.find((b) => b.leaseId === parseInt(formData.leaseId));

        if (leaseBalance && parseFloat(formData.amount) > leaseBalance.balance) {
            alert("Payment exceeds the tenant's remaining balance.");
            return;
        }

        try {
            if (editId) {
                await updatePayment(editId, formData);
            } else {
                await createPayment(formData);
            }
            setFormData({ leaseId: "", amount: "", date: "", method: "" });
            setEditId(null);
            loadData();
        } catch (error) {
            console.error("Error saving payment:", error);
        }
    };

    const handleEdit = (payment) => {
        setEditId(payment.id);
        setFormData({ leaseId: payment.leaseId, amount: payment.amount, date: payment.date, method: payment.method });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            await deletePayment(id);
            loadData();
        }
    };

    return (
        <div>
            <h2>Manage Payments</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="leaseId" value={formData.leaseId} onChange={handleChange} placeholder="Lease ID" required />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="text" name="method" value={formData.method} onChange={handleChange} placeholder="Payment Method" required />
                <button type="submit">{editId ? "Update" : "Add"} Payment</button>
            </form>

            <h3>Tenant Balances</h3>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Tenant</th>
                        <th>Lease ID</th>
                        <th>Total Due</th>
                        <th>Total Paid</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((b) => (
                        <tr key={b.leaseId}>
                            <td>{b.tenantName}</td>
                            <td>{b.leaseId}</td>
                            <td>${b.totalDue}</td>
                            <td>${b.totalPaid}</td>
                            <td style={{ color: b.balance > 0 ? "red" : "green" }}>${b.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Payment History</h3>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lease ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.leaseId}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.date}</td>
                            <td>{payment.method}</td>
                            <td>
                                <button onClick={() => handleEdit(payment)}>Edit</button>
                                <button onClick={() => handleDelete(payment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManager;
