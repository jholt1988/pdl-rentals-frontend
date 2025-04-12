// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, roles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-6">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (roles.length && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
