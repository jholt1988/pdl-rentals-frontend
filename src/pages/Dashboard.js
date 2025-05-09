import React,{useState, useEffect} from "react";

import Sidebar from "../components/Dashboard/Sidebar";
import { motion } from "framer-motion";
import * as apiService from "../services/apiService";
import "./Dashboard.css";
import  GlobalLayout from "../GlobalLayout";
import LogoutButton from "../components/Buttons/LogoutButton";
import { useContext } from "react";
import  AuthContext  from "../context/AuthContext";

const { fetchLeases,
    fetchProperties,
    fetchUsers,
    fetchPayments,
    fetchMaintenanceRequests,
    fetchNotifications,
    fetchReports, } =apiService
const Dashboard = () => {
    const [leases, setLeases] = useState([]);
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("leases");
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const leaseData = await fetchLeases();
                const paymentData = await fetchPayments();
                const maintenanceData = await fetchMaintenanceRequests();
                const notificationData = user ? await fetchNotifications(user.id) : [];
                const reportData = await fetchReports();

                setLeases(leaseData);
                setPayments(paymentData);
                setMaintenance(maintenanceData);
                setNotifications(notificationData);
                setReports(reportData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="loading">Loading data...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
    
        <div className="dashboard-container"
         >
            

            <h2 className="dashboard-title">Dashboard</h2>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="dashboard-content"
            >
                {activeSection === "properties" && (
                    <div className="dashboard-card"><h3>Properties</h3><ul>{properties.map((property) => (
                        <li key={property.id} className="dashboard-item">{`${property.address} - ${property.status}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "tenants" && (
                    <div className="dashboard-card"><h3>Tenants</h3><ul>{users.map((user) => (
                        <li key={user.id} className="dashboard-item">{`${user.name} - ${user.email}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "contractors" && (
                    <div className="dashboard-card"><h3>Contractors</h3><ul>{users.map((user) => (  <li key={user.id} className="dashboard-item">{`${user.name} - ${user.email}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "admin-dashboard" && (
                    <div className="dashboard-card"><h3>Admin Dashboard</h3><p>Admin-specific content goes here.</p></div>
                )} 
                {activeSection === "settings" && (      
                        <div className="dashboard-card"><h3>Settings</h3><p>Settings-specific content goes here.</p></div>
                )} 
                {activeSection === "dashboard" && (
                    <div className="dashboard-card"><h3>Dashboard</h3><p>Dashboard-specific content goes here.</p></div>
                )}
                {activeSection === "notifications" && ( 
                    <div className="dashboard-card"><h3>Notifications</h3><ul>{notifications.map((notification) => (
                        <li key={notification.id} className="dashboard-item">{`${notification.type}: ${notification.message}`}</li>
                    ))}</ul></div>
                )} 
                {activeSection === "reports" && (
                    <div className="dashboard-card"><h3>Reports</h3><ul>{reports.map((report) => (  
                        <li key={report.id} className="dashboard-item">{report.title}</li>
                    ))}</ul></div>
                )} 

                {activeSection === "leases" && (
                    <div className="dashboard-card"><h3>Leases</h3><ul>{leases.map((lease) => (
                        <li key={lease.id} className="dashboard-item">{`${lease.property} - ${lease.tenant} - ${lease.status}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "payments" && (
                    <div className="dashboard-card"><h3>Payments</h3><ul>{payments.map((payment) => (
                        <li key={payment.id} className="dashboard-item">{`$${payment.amount} - ${payment.status}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "maintenance" && (
                    <div className="dashboard-card"><h3>Maintenance Requests</h3><ul>{maintenance.map((request) => (
                        <li key={request.id} className="dashboard-item">{`${request.issue} - ${request.status}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "notifications" && (
                    <div className="dashboard-card"><h3>Notifications</h3><ul>{notifications.map((notification) => (
                        <li key={notification.id} className="dashboard-item">{`${notification.type}: ${notification.message}`}</li>
                    ))}</ul></div>
                )}
                {activeSection === "reports" && (
                    <div className="dashboard-card"><h3>Reports</h3><ul>{reports.map((report) => (
                        <li key={report.id} className="dashboard-item">{report.title}</li>
                    ))}</ul></div>
                )}
            </motion.div>
            <LogoutButton />
        </div>
     
    );
};

export default Dashboard;



// import React,{useContext} from "react";
// import Sidebar from "../components/Dashboard/Sidebar";
// import PropertyList from "../components/Lists/PropertyList";
// import PropertyManager from "../components/Dashboard/PropertyManager";
// import TenantManager from "../components/Dashboard/TenantManager";
// import PaymentManager from "../components/Dashboard/PaymentManager";
// import MaintenanceManager from "../components/Dashboard/MaintenanceManager";
// import AdminDashboard from "../components/Admin/AdminDashboard";
// import AuthContext  from "../context/AuthContext";   
// import LeaseManager from "../components/Dashboard/LeaseManager";
// import GlobalLayout from "../GlobalLayout";

// const Dashboard = () => {
//     const {user} = useContext(AuthContext);
//     return (
    
     
//             <div style={{ flex: 1, padding: "20px" }}>
//                 <h1>Dashboard</h1>
//                 {user?.role === "Admin" && <PropertyList />}
//                 {user?.role === "Admin" && <PropertyManager />}
//                 {user?.role === "Admin" && <TenantManager />}
//                 {user?.role === "Admin" && <LeaseManager />}
//                 {user?.role === "Admin" && <PaymentManager />}
//                 {user?.role === "Admin" && <MaintenanceManager />}
//                 {user?.role === "Admin" && <AdminDashboard />}
//             </div>
        
//     );
// };

// export default Dashboard;
