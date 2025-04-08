import React, { useEffect, useState } from "react";
import { fetchFinancialReports, fetchRentalTrends, fetchMaintenanceStats, generateReport } from "../../services/apiService";
import { Bar, Line, Pie } from "react-chartjs-2";

const ReportsDashboard = () => {
    const [financialData, setFinancialData] = useState(null);
    const [rentalTrends, setRentalTrends] = useState(null);
    const [maintenanceStats, setMaintenanceStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const financial = await fetchFinancialReports();
                const rental = await fetchRentalTrends();
                const maintenance = await fetchMaintenanceStats();
                setFinancialData(financial);
                setRentalTrends(rental);
                setMaintenanceStats(maintenance);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleGenerateReport = async (type) => {
        try {
            await generateReport(type);
            alert("Report generated successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading reports...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Reports & Analytics</h2>

            <h3>Financial Reports</h3>
            {financialData && <Bar data={financialData} />}

            <h3>Rental Income Trends</h3>
            {rentalTrends && <Line data={rentalTrends} />}

            <h3>Maintenance Requests Overview</h3>
            {maintenanceStats && <Pie data={maintenanceStats} />}

            <h3>Generate Reports</h3>
            <button onClick={() => handleGenerateReport("financial")}>Download Financial Report</button>
            <button onClick={() => handleGenerateReport("rental-trends")}>Download Rental Trends Report</button>
            <button onClick={() => handleGenerateReport("maintenance-stats")}>Download Maintenance Report</button>
        </div>
    );
};

export default ReportsDashboard;
