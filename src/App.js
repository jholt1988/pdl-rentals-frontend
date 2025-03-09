import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthContext from "./context/AuthContext";
import GlobalLayout from "./GlobalLayout";


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
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <GlobalLayout/>
              
              
          </PrivateRoute>
        } 
        >
          <Route path="main"
            element={
                   <Dashboard/>
                 }
          />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
