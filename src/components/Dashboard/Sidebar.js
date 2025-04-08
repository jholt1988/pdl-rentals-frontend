import React, { useState } from 'react';
import {Tooltip} from "react-tooltip";
import "./Sidebar.css";
import { motion } from "framer-motion";
import { FiHome, FiDollarSign, FiTool, FiBell, FiBarChart2, FiMenu } from "react-icons/fi";

const Sidebar = ({ setActiveSection }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            initial={{ x: -200 }}
            animate={{ x: isCollapsed ? -200 : 0 }}
            transition={{ duration: 0.5 }}
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        >
            <button className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                <FiMenu />
            </button>
            <ul>
                <li data-tip="Dashboard" onClick={() => setActiveSection("dashboard")}>
                    <FiHome /> {!isCollapsed && "Dashboard"}
                </li>
                <li data-tip="Properties" onClick={() => setActiveSection("properties")}>
                    <FiHome /> {!isCollapsed && "Properties"}
                </li>
                <li data-tip="Tenants" onClick={() => setActiveSection("tenants")}>
                    <FiHome /> {!isCollapsed && "Tenants"}
                </li>   

                <li data-tip="Leases" onClick={() => setActiveSection("leases")}>
                    <FiHome /> {!isCollapsed && "Leases"}
                </li>
                <li data-tip="Payments" onClick={() => setActiveSection("payments")}>
                    <FiDollarSign /> {!isCollapsed && "Payments"}
                </li>
                <li data-tip="Maintenance" onClick={() => setActiveSection("maintenance")}>
                    <FiTool /> {!isCollapsed && "Maintenance"}
                </li>   
                <li data-tip="Contractors" onClick={() => setActiveSection("contractors")}>
                    <FiHome /> {!isCollapsed && "Contractors"}
                </li>
                <li data-tip="Notifications" onClick={() => setActiveSection("notifications")}>
                    <FiBell /> {!isCollapsed && "Notifications"}
                </li>
                <li data-tip="Reports" onClick={() => setActiveSection("reports")}>
                    <FiBarChart2 /> {!isCollapsed && "Reports"}
                </li>
                <li data-tip="Admin Dashboard" onClick={() => setActiveSection("admin-dashboard")}>
                    <FiHome /> {!isCollapsed && "Admin Dashboard"}
                </li>
                <li data-tip="Settings" onClick={() => setActiveSection("settings")}>
                    <FiHome /> {!isCollapsed && "Settings"}
                </li>

            </ul>
            <Tooltip place="right" effect="solid" />
        </motion.div>
    );
};


export default Sidebar


// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHome, FaUser, FaMoneyBill, FaTools, FaSignOutAlt } from "react-icons/fa";
// import AuthContext from "../../context/AuthContext";
// import { logoutUser } from "../../services/authService";
// import "../../theme.css"

// const Sidebar = () => {
//     const { user, setUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logoutUser();
//         setUser(null);
//         navigate("/login");
//     };

//     return (
//         <div style={{ width: "250px", height: "100vh", background: "#333", color: "white", padding: "20px" }}>
//             <img src="/logo.png" alt="PDL Rentals Logo" style={{ width: "100px", marginRight: "10px" }} />
//             <h2>PDL Rentals</h2>
//             <p>Welcome, {user?.name}</p>
//             <nav>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                     {user?.role === "Admin" && <li><Link to="/dashboard" style={{ color: "white" }}><FaHome /> Properties</Link></li>}
//                     {user?.role === "Admin" && <li><Link to="/tenants" style={{ color: "white" }}><FaUser /> Tenants</Link></li>}
//                     {(user?.role === "Tenant" || user?.role === "Admin") && <li><Link to="/payments" style={{ color: "white" }}><FaMoneyBill /> Payments</Link></li>}
//                     {(user?.role === "Contractor" || user?.role === "Admin") && <li><Link to="/maintenance" style={{ color: "white" }}><FaTools /> Maintenance</Link></li>}
//                     {user?.role === "Admin" && <li><Link to="/dashboard" style={{ color: "white" }}>Admin Dashboard</Link></li>}
//                     <li><button onClick={handleLogout} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}><FaSignOutAlt /> Logout</button></li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;
