import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMessage } from '../../components/Message/MessageContext';

const Protected = ({ children }) => {
    const token = localStorage.getItem('token');
    const { setMessage } = useMessage();

    if (!token) {
        setMessage('Você não tem autorização para acessar esta página.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default Protected;
