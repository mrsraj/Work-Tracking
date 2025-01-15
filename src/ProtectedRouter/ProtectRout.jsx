import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    let isAuth = localStorage.getItem('user_id');

    console.log("isAuthenticated = ", isAuth);

    return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;