import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthContext from "./context/AuthContext";
import GlobalLayout from "./GlobalLayout";
import ProtectedRoute from "./routes/protectedRoutes";
import PropertyList from "./components/Lists/PropertyList";
import TenantList from "./components/Lists/TenantList";
import PaymentsList from "./components/Lists/PaymentsList"; 
import ContractorsList  from "./components/Lists/ContractorsList";
import ExpenseList from "./components/Lists/ExpenseList"; 
import MaintenanceRequestList from "./components/Lists/MaintenanceRequestList";
import LeaseList from "./components/Lists/LeaseList";

import NotificationsList from "./components/Lists/NotificationsList"; 
import PropertyManager from "./components/Dashboard/PropertyManager";
import LeaseManager from "./components/Dashboard/LeaseManager";
import TenantManager from "./components/Dashboard/TenantManager";
import DocumentsList from "./components/Lists/DocumentsList"; 
import "./theme.css";
import ReportsDashboard from "./components/Dashboard/ReportsDashboard";


const PrivateRoute = React.memo(({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route element={<GlobalLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        

        <Route
          path="/properties"
          element={
            
              <PropertyManager />
          
          }
        />
        <Route
          path="/tenants"
          element={
           
              <TenantManager />
            
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractors"
          element={
            <ProtectedRoute>
              <ContractorsList />
            </ProtectedRoute>
          }
        />
        <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute><MaintenanceRequestList /></ProtectedRoute>} />
        <Route path="/leases" element={<LeaseManager/>} /> 
        <Route path="/notifications" element={<ProtectedRoute><NotificationsList /></ProtectedRoute>} />
          <Route path="/documents" element={<ReportsDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
