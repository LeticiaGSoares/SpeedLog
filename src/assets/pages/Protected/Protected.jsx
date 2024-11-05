import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMessage } from '../../components/Message/MessageContext';

const Protected = ({ children }) => {

    return children;
};

export default Protected;
