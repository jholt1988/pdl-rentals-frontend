import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthContext from "./context/AuthContext";
import GlobalLayout from "./GlobalLayout";
import ProtectedRoute from "./routes/protectedRoutes";
import PaymentsList from "./features/payments/PaymentManager";
import ContractorsList from "./components/Lists/ContractorsList";
import ExpenseList from "./components/Lists/ExpenseList";
import MaintenanceManager from "./features/maintenance/MaintenanceManager";

import NotificationsList from "./components/Lists/NotificationsList";
import PropertyManager from "./features/properties/PropertyManager";
import LeaseManager from "./features/leases/LeaseManager";
import TenantManager from "./features/tenants/TenantManager";
import DocumentManager from "./features/documents/DocumentManager";

import "./styles.css"

import ReportsDashboard from "./features/reports/ReportsDashboard";



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
              
                <Dashboard />
              
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
            
              <PaymentsList />
            
          }
        />
        <Route
          path="/contractors"
          element={
            
              <ContractorsList />
            
          }
        />
        <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
          <Route path="/maintenance" element={<MaintenanceManager />} />
        <Route path="/leases" element={<LeaseManager/>} /> 
        <Route path="/notifications" element={<NotificationsList />} />
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route path="/documents" element={<DocumentManager />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
