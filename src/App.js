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

import "./styles.css"

import ReportsDashboard from "./features/reports/ReportsDashboard";

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
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/properties"
              element={
                <PrivateRoute>
                  <PropertyManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/tenants"
              element={
                <PrivateRoute>
                  <TenantManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <PrivateRoute>
                  <PaymentsList />
                </PrivateRoute>
              }
            />
            <Route path="/contractors" element={<ContractorsList />} />
            <Route
              path="/expenses"
              element={
                <PrivateRoute>
                  <ExpenseList />
                </PrivateRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <PrivateRoute>
                  <MaintenanceManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/leases"
              element={
                <PrivateRoute>
                  <LeaseManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsList />
                </PrivateRoute>
              }
            />
            <Route path="/reports" element={<PrivateRoute><ReportsDashboard /></PrivateRoute>} />
            <Route path="/documents" element={<PrivateRoute><DocumentManager /></PrivateRoute>} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="/ledgers" element={<PrivateRoute>< LedgerTable/></PrivateRoute>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
