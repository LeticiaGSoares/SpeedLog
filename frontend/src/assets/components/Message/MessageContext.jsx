// MessageContext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);
