// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <Lock className="w-12 h-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don’t have permission to view this page.</p>
            <Link to="/" className="text-blue-600 hover:underline">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default UnauthorizedPage;