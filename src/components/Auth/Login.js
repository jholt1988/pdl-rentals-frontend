import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import * as apiService from "../../services/apiService";
import * as authService from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formData = { email, password };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userEmail = formData.email
            const password = formData.password
            const data = await authService.loginUser({ userEmail, password }); ;
            setUser(data.user);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    };
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
