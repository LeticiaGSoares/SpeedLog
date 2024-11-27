import React from 'react';
import { Navigate } from 'react-router-dom';

const VerifyAuthLogin = ({ children }) => {
    const getToken = localStorage.getItem("token");

    if (getToken != "null") {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default VerifyAuthLogin;
