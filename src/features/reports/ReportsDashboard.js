// src/features/reports/ReportsDashboard.jsx
import React, { useEffect } from 'react';
import useReports from './useReports';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const ReportsDashboard = () => {
    const { data, loadReports } = useReports();

    useEffect(() => {
        loadReports();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Reports Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-gray-500">Total Rent Collected</h4>
                    <p className="text-xl font-bold">${data.totalRent?.toFixed(2) || 0}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-gray-500">Active Leases</h4>
                    <p className="text-xl font-bold">{data.activeLeases || 0}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-gray-500">Open Maintenance</h4>
                    <p className="text-xl font-bold">{data.openMaintenance || 0}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Monthly Rent Income</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.rentByMonth || []}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Payments Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.paymentTrends || []}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportsDashboard;
