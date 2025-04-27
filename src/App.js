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
import UnauthorizedPage from "./pages/UnauthorizedPage";
import LedgerTable from "./features/ledger/LedgerTable";
import DashboardHome from "./pages/DashboardHome";
import "./styles.css"

import ReportsDashboard from "./features/reports/ReportsDashboard";
import ProfilePage
  from "./pages/ProfilePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const PrivateRoute = React.memo(({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
});

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route element={<GlobalLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />

            <Route
              path="/properties"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <PropertyManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tenants"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <TenantManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <PaymentsList />
                </ProtectedRoute>
              }
            />
            <Route path="/contractors" element={<ContractorsList />} />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <ExpenseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <MaintenanceManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leases"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <LeaseManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <NotificationsList />
                </ProtectedRoute>
              }
            />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={['Admin']}><ReportsDashboard /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute allowedRoles={['Admin']}><DocumentManager /></ProtectedRoute>} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/ledgers" element={<ProtectedRoute allowedRoles={['Admin']}>< LedgerTable /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['Admin']}><ProfilePage /></ProtectedRoute>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
