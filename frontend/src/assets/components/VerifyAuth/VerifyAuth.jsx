import React from 'react';
import { Navigate } from 'react-router-dom';

const VerifyAuth = ({ children }) => {
    const getToken = localStorage.getItem("token");

    if (getToken == 'null') {
        return <h1>Você não está logado</h1>;
    }

    return children;
};

export default VerifyAuth;
