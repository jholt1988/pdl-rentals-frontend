import React,{useContext} from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import PropertyList from "../components/Dashboard/PropertyList";
import PropertyManager from "../components/Dashboard/PropertyManager";
import TenantManager from "../components/Dashboard/TenantManager";
import PaymentManager from "../components/Dashboard/PaymentManager";
import MaintenanceManager from "../components/Dashboard/MaintenanceManager";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AuthContext  from "../context/AuthContext";   
import LeaseManager from "../components/Dashboard/LeaseManager";
import GlobalLayout from "../GlobalLayout";



const Dashboard = () => {
    const {user} = useContext(AuthContext);
    return (
    
     
            <div style={{ flex: 1, padding: "20px" }}>
                <h1>Dashboard</h1>
                {user?.role === "Admin" && <PropertyList />}
                {user?.role === "Admin" && <PropertyManager />}
                {user?.role === "Admin" && <TenantManager />}
                {user?.role === "Admin" && <LeaseManager />}
                {(user?.role === "Tenant" || "Admin") && <PaymentManager />}
                {(user?.role === "Contractor"|| "Admin") && <MaintenanceManager />}
                {user?.role === "Admin" && <AdminDashboard />}
            </div>
        
    );
};

export default Dashboard;
