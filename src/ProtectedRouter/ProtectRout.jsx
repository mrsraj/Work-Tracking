import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../ContextAPIs/ContextApi';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useMyContext();

    console.log("isAuthenticated = ", isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;