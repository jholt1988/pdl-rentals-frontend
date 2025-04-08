// GlobalLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";

import "./theme.css"
const GlobalLayout = ({children}) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <div className="container">
                    {/* The Outlet renders the nested route component */}
                    <Outlet />
                
                </div>
            </div>
        </div>
    );
};

export default GlobalLayout;
