import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaMoneyBill, FaTools, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

const Sidebar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate("/login");
    };

    return (
        <div style={{ width: "250px", height: "100vh", background: "#333", color: "white", padding: "20px" }}>
            <img src="/logo.png" alt="PDL Rentals Logo" style={{ width: "100px", marginRight: "10px" }} />
            <h2>PDL Rentals</h2>
            <p>Welcome, {user?.name}</p>
            <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {user?.role === "Admin" && <li><Link to="/dashboard" style={{ color: "white" }}><FaHome /> Properties</Link></li>}
                    {user?.role === "Admin" && <li><Link to="/tenants" style={{ color: "white" }}><FaUser /> Tenants</Link></li>}
                    {user?.role === "Tenant"|| "Admin" && <li><Link to="/payments" style={{ color: "white" }}><FaMoneyBill /> Payments</Link></li>}
                    {user?.role === "Contractor" || "Admin" && <li><Link to="/maintenance" style={{ color: "white" }}><FaTools /> Maintenance</Link></li>}
                    {user?.role === "Admin" && <li><Link to="/dashboard" style={{ color: "white" }}>Admin Dashboard</Link></li>}
                    <li><button onClick={handleLogout} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}><FaSignOutAlt /> Logout</button></li>
                </ul>

            </nav>
        </div>
    );
};

export default Sidebar;
