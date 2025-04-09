import React, { useState } from 'react';
import {Tooltip} from "react-tooltip";
import "./Sidebar.css";
import { motion } from "framer-motion";
import { FiHome, FiDollarSign, FiTool, FiBell, FiBarChart2, FiMenu, FiLoader, FiWatch } from "react-icons/fi";
import  {NavLink } from "react-router-dom";
const Sidebar = ({ setActiveSection }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            initial={{ x: 10 }}
            animate={{ x: isCollapsed ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        >
            <button className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                <FiMenu />
            </button>
            <ul>
                <li data-tip="Dashboard" onClick={() => setActiveSection("dashboard")}>
                  <NavLink to="/dashboard">  <FiHome /> {!isCollapsed && "Dashboard"} </NavLink>
                </li>
                <li data-tip="Properties" onClick={() => setActiveSection("properties")}>
                   <NavLink to={"/properties"}><FiHome /> {!isCollapsed && "Properties"} </NavLink>
                </li>
                <li data-tip="Tenants" onClick={() => setActiveSection("tenants")}>
                  <NavLink to={"/tenants"}>  <FiHome /> {!isCollapsed && "Tenants"} </NavLink>
                </li>   

                <li data-tip="Leases" onClick={() => setActiveSection("leases")}>
                   <NavLink to={"/leases"}>  <FiHome /> {!isCollapsed && "Leases"} </NavLink>
                </li>
                <li data-tip="Payments" onClick={() => setActiveSection("payments")}>
                   <NavLink to={"/payments"}> <FiDollarSign /> {!isCollapsed && "Payments"} </NavLink>
                </li>
                <li data-tip="Maintenance" onClick={() => setActiveSection("maintenance")}>
                   <NavLink to={"/maintenance"}> <FiTool /> {!isCollapsed && "Maintenance"} </NavLink>
                </li>
                <li data-tip="Contractors" onClick={() => setActiveSection("contractors")}>
                   <NavLink to={"/contractors"}> <FiHome /> {!isCollapsed && "Contractors"} </NavLink>
                </li>
                <li data-tip="Notifications" onClick={() => setActiveSection("notifications")}>
                   <NavLink to={"/notifications"}> <FiBell /> {!isCollapsed && "Notifications"} </NavLink>
                </li>
                <li data-tip="Reports" onClick={() => setActiveSection("reports")}>
                   <NavLink to={"/reports"}> <FiBarChart2 /> {!isCollapsed && "Reports"} </NavLink>
             </li>
             <li data-tip="Documents" onClick={() => setActiveSection("documents")}>
                <NavLink to={"/documents"}> <FiLoader /> {!isCollapsed && "Documents"} </NavLink>
               </li>
                <li data-tip="Admin Dashboard" onClick={() => setActiveSection("admin-dashboard")}>
                   <NavLink to={"/admin-dashboard"}> <FiWatch /> {!isCollapsed && "Admin Dashboard"} </NavLink>
                </li>
                <li data-tip="Settings" onClick={() => setActiveSection("settings")}>
                   <NavLink to={"/settings"}> <FiHome /> {!isCollapsed && "Settings"} </NavLink>
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
