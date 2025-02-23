import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Welcome to PDL Rentals</h1>
            <p>Manage your properties, tenants, and payments efficiently.</p>
            <div>
                <Link to="/login">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Login</button>
                </Link>
                <Link to="/register">
                    <button style={{ margin: "10px", padding: "10px 20px" }}>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
