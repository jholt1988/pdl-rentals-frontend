// GlobalLayout.js
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";

import "./theme.css"

const GlobalLayout = () => {
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();

    // Function to handle setting active section
    const handleSetActiveSection = (section) => {
        setActiveSection(section);
        // You can add additional logic here like persisting the state
        localStorage.setItem('activeSection', section);
    };

    // Effect to update active section based on route changes
    React.useEffect(() => {
        // Extract section from pathname
        const currentSection = location.pathname.split('/')[1] || 'dashboard';
        handleSetActiveSection(currentSection);
    }, [location]);

    return (
        <div className="layout-container">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                
            />
            <div className="main-content">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default GlobalLayout;
