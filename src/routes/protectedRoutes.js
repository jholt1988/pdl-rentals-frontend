import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    return Boolean(localStorage.getItem("token"));
};

const ProtectedRoute=() => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={ "/login" } replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
