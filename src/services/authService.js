import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_URL || "http://localhost:5000/api"; // Change this if your backend is hosted

// Register User
export const registerUser = async (userData) => {
    try {
               console.log(userData);
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Login User

export const loginUser = async (userData) => {
    try {
        console.log(userData);
        const { email, password } = userData;
        console.log(email, password);

        const response = await axios.post(`${API_URL}/login`, { email, password }); 

        localStorage.setItem("token", response.data.token); // Store token for authentication
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Logout User
export const logoutUser = () => {
    localStorage.removeItem("token");
}
export const useAuth = () => {
    const login = async (credentials) => {
        const response = await loginUser(credentials);
        document.cookie = `token=${response.token}; Secure; HttpOnly; Path=/`;
        return response;
    };

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    return { login, logout };
};

// Get Token
export const getToken = () => {
    return localStorage.getItem("token");
};
